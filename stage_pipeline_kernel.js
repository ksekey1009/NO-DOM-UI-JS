/*
 * Stage-Pipeline Kernel Reconstruction
 * Refactor: absorb HTML4 UI concepts from legacy kernel into pipeline runtime
 */

class Node {
  constructor(type = "div", props = {}) {
    this.type = type;
    this.props = props;
    this.style = props.style || {};
    this.children = [];
    this.parent = null;
    this.x = 0;
    this.y = 0;
    this.w = props.w || 0;
    this.h = props.h || 0;
    this.layoutDirty = true;
    this.listeners = { capture: {}, bubble: {} };

    // HTML4-ish state
    this.focusable = !!props.focusable || ["input", "button", "a", "textarea", "select"].includes(type);
    this.tabIndex = Number.isInteger(props.tabIndex) ? props.tabIndex : 0;
    this.focused = false;
    this.value = props.value || "";
    this.name = props.name || "";
    this.href = props.href || "";
    this.checked = !!props.checked;
  }

  add(child) { child.parent = this; this.children.push(child); this.markDirty(); return child; }
  on(type, fn, phase = "bubble") { this.listeners[phase][type] = fn; return this; }
  markDirty() { this.layoutDirty = true; if (this.parent) this.parent.markDirty(); }
}

class SceneGraph { constructor(root) { this.root = root; } }

class HTML4Rules {
  static isBlock(node) { return ["div", "p", "section", "form", "table", "ul", "ol", "li", "fieldset"].includes(node.type); }
  static isText(node) { return node.type === "text"; }
  static isLink(node) { return node.type === "a"; }
  static isInput(node) { return ["input", "textarea", "select"].includes(node.type); }
  static isRadio(node) { return node.type === "radio"; }
  static isIframe(node) { return node.type === "iframe"; }
  static isTable(node) { return node.type === "table"; }
  static isTr(node) { return node.type === "tr"; }
  static isTd(node) { return node.type === "td"; }
  static isList(node) { return node.type === "ul" || node.type === "ol"; }
  static isHidden(node) { return node.style.display === "none" || node.style.visibility === "hidden"; }
  static isInline(node) { return ["span", "b", "i", "u", "label"].includes(node.type); }
  static isHr(node) { return node.type === "hr"; }
  static isMarquee(node) { return node.type === "marquee"; }
  static isCenter(node) { return node.type === "center"; }
}

class CSS {
  static computeStyle(node, parent = null) {
    const p = parent?.computed || {};
    node.computed = node.computed || {};
    node.computed.color = node.style.color || p.color || "#000";
    node.computed.bg = node.style.bg || p.bg || "";
    node.computed.fontSize = Number(node.style.fontSize || p.fontSize || 12);
  }
}

class TextEngine {
  static measure(text, size = 12) {
    const t = String(text || "").replace(/\s+/g, " ");
    return { w: Math.max(8, t.length * Math.ceil(size * 0.55)), h: size + 6 };
  }
}

class CSSSelectorEngine {
  static match(node, selector) {
    if (!selector) return false;
    if (selector[0] === "#") return node.props.id === selector.slice(1);
    if (selector[0] === ".") return String(node.props.className || "").split(/\s+/).includes(selector.slice(1));
    return node.type === selector;
  }

  static query(root, selector, out = []) {
    if (this.match(root, selector)) out.push(root);
    for (const c of root.children) this.query(c, selector, out);
    return out;
  }
}

class DOMAPI {
  static getElementById(root, id) { return CSSSelectorEngine.query(root, `#${id}`)[0] || null; }
  static getElementsByTagName(root, tag) { return CSSSelectorEngine.query(root, tag); }
  static getElementsByClassName(root, name) { return CSSSelectorEngine.query(root, `.${name}`); }
}

class HTMLParser {
  static parse(html) {
    const root = new Node("div", { w: 800, h: 600, padding: 6 });
    const stack = [root];
    const tokens = html.match(/<[^>]+>|[^<]+/g) || [];

    for (const token of tokens) {
      if (token.startsWith("<")) {
        if (token.startsWith("</")) { stack.pop(); continue; }

        const tag = token.replace(/[<>]/g, "").trim();
        const parts = tag.split(/\s+/);
        const type = parts[0].toLowerCase();
        const props = {};

        for (let i = 1; i < parts.length; i += 1) {
          const [k, raw] = parts[i].split("=");
          if (!k) continue;
          const v = (raw || "").replace(/^['"]|['"]$/g, "");
          props[k] = v;
        }

        const node = new Node(type, props);
        stack[stack.length - 1].add(node);
        if (!token.endsWith("/>") && type !== "br" && type !== "hr" && type !== "img") stack.push(node);
      } else {
        const text = token.trim();
        if (!text) continue;
        stack[stack.length - 1].add(new Node("text", { text }));
      }
    }

    return root;
  }
}

class History {
  constructor() { this.stack = []; this.index = -1; }
  push(url) { this.stack = this.stack.slice(0, this.index + 1); this.stack.push(url); this.index += 1; }
  back() { return this.index > 0 ? this.stack[--this.index] : null; }
  forward() { return this.index < this.stack.length - 1 ? this.stack[++this.index] : null; }
}

class FocusManager {
  constructor() { this.current = null; this.list = []; this.index = -1; }

  rebuild(root) {
    this.list = [];
    const walk = (n) => { if (n.focusable) this.list.push(n); for (const c of n.children) walk(c); };
    walk(root);
    this.list.sort((a, b) => a.tabIndex - b.tabIndex);
  }

  set(node) {
    if (this.current) this.current.focused = false;
    this.current = node;
    if (this.current) this.current.focused = true;
  }

  next() {
    if (!this.list.length) return null;
    this.index = (this.index + 1) % this.list.length;
    this.set(this.list[this.index]);
    return this.current;
  }
}

class PipelineContext {
  constructor(kernel, frameTime) {
    this.kernel = kernel;
    this.frameTime = frameTime;
    this.root = kernel.scene.root;
    this.events = [];
    this.hitTargets = [];
    this.invalidNodes = [];
    this.renderList = [];
    this.dirtyRects = [];
  }
}


class CascadeLayer { constructor(priority = 0) { this.priority = priority; this.rules = []; } add(sel, style) { this.rules.push({ sel, style }); } }
class CSSOM {
  constructor() { this.layers = []; }
  addLayer(layer) { this.layers.push(layer); this.layers.sort((a, b) => a.priority - b.priority); }
  apply(node) {
    for (const layer of this.layers) {
      for (const rule of layer.rules) {
        if (CSSSelectorEngine.match(node, rule.sel)) Object.assign(node.style, rule.style);
      }
    }
  }
}
class LineHeightResolver { static compute(node) { return Number(node?.style?.lineHeight || node?.computed?.fontSize || 16); } }
class PaintInvalidator {
  constructor() { this.rects = []; }
  invalidate(x, y, w, h) { this.rects.push({ x, y, w, h }); }
  flush(ctx) {
    if (!ctx) { this.rects.length = 0; return; }
    for (const r of this.rects) ctx.clearRect(r.x, r.y, r.w, r.h);
    this.rects.length = 0;
  }
}


class StageAnchorMap { constructor() { this.map = {}; } set(k, v) { this.map[k] = v; } get(k) { return this.map[k]; } }
class EventPropagation {
  static capture(path, type, payload) { for (let i = path.length - 1; i >= 0; i -= 1) { const fn = path[i].listeners?.capture?.[type]; if (fn) fn(payload); } }
  static bubble(path, type, payload) { for (let i = 0; i < path.length; i += 1) { const fn = path[i].listeners?.bubble?.[type]; if (fn) fn(payload); } }
}
class HitTest { static run(events, root, x, y) { return events.hit(root, x, y); } }
class LayoutScheduler { constructor() { this.queue = new Set(); } schedule(n) { if (n) this.queue.add(n); } flush() { for (const n of this.queue) n.markDirty(); this.queue.clear(); } }
class RenderScheduler { constructor() { this.queue = new Set(); } schedule(n) { if (n) this.queue.add(n); } flush() { this.queue.clear(); } }
class DOMRangeUpdater { static update(range, node, offset) { if (range) range.last = { node, offset }; } }

class KernelStage { constructor(name, run) { this.name = name; this.run = run; } }
class KernelPipeline { constructor(stages = []) { this.stages = stages; } use(stage) { this.stages.push(stage); return this; } execute(ctx) { for (const s of this.stages) s.run(ctx); } }

class InputQueue {
  constructor() { this.queue = []; }
  push(type, x, y, detail = {}) { this.queue.push({ type, x, y, detail }); }
  pushKey(key) { this.queue.push({ type: "keydown", x: 0, y: 0, detail: { key } }); }
  poll() { const out = this.queue.slice(); this.queue.length = 0; return out; }
}

class EventSystem {
  constructor(focus, history) { this.focus = focus; this.history = history; }

  hit(root, x, y) {
    const walk = (node, ox, oy) => {
      const ax = ox + node.x; const ay = oy + node.y;
      for (let i = node.children.length - 1; i >= 0; i -= 1) { const h = walk(node.children[i], ax, ay); if (h) return h; }
      if (x >= ax && y >= ay && x <= ax + node.w && y <= ay + node.h) return node;
      return null;
    };
    return walk(root, 0, 0);
  }

  path(target) { const p = []; for (let n = target; n; n = n.parent) p.push(n); return p; }

  dispatch(type, target, event) {
    if (!target) return;
    const path = this.path(target);

    EventPropagation.capture(path, type, { ...event, target, phase: "capture" });
    EventPropagation.bubble(path, type, { ...event, target, phase: "bubble" });

    if (target.focusable && (type === "click" || type === "mousedown")) this.focus.set(target);
    if (HTML4Rules.isLink(target) && type === "click" && target.href) this.history.push(target.href);

    if (HTML4Rules.isInput(target) && type === "input") target.value += event.detail?.text || "";
    if (type === "keydown" && event.detail?.key && HTML4Rules.isInput(target)) {
      const k = event.detail.key;
      if (k === "Backspace") target.value = target.value.slice(0, -1);
      else if (k.length === 1) target.value += k;
    }
    if (target.type === "checkbox" && type === "click") target.checked = !target.checked;
    if (type === "mouseover" && target.listeners.bubble.mouseover) target.listeners.bubble.mouseover({ ...event, target, phase: "bubble" });
  }
}

class DirtyRegion { constructor() { this.rects = []; } add(x, y, w, h) { this.rects.push({ x, y, w, h }); } clear() { this.rects.length = 0; } }

class LayoutEngine {
  compute(root, width = 800) { this.layoutNode(root, 0, 0, width); }

  layoutNode(node, x, y, width) {
    if (!node.layoutDirty) return;
    if (!SecurityManager.check(node) || HTML4Rules.isHidden(node)) { node.w = 0; node.h = 0; node.layoutDirty = false; return; }

    const pad = Number(node.props.padding || 0);
    node.x = x; node.y = y; node.w = Number(node.props.w || width);

    if (HTML4Rules.isText(node)) {
      const text = node.props.text || node.value || "";
      const m = TextEngine.measure(text, node.computed?.fontSize || 12);
      node.w = Math.max(node.w, m.w);
      node.h = m.h;
      node.layoutDirty = false;
      return;
    }
    if (HTML4Rules.isTable(node)) {
      let cols = 0;
      for (const tr of node.children) cols = Math.max(cols, tr.children.length);
      const cw = Math.max(24, Math.floor(node.w / (cols || 1)));
      let ty = 0;
      for (const tr of node.children) {
        let tx = 0;
        for (const td of tr.children) {
          this.layoutNode(td, tx, ty, cw);
          td.w = cw;
          td.h = td.h || 24;
          tx += cw;
        }
        tr.x = 0; tr.y = ty; tr.w = node.w; tr.h = 24;
        ty += 24;
      }
      node.h = Math.max(ty, 24);
      node.layoutDirty = false;
      return;
    }
    if (HTML4Rules.isList(node)) {
      let ly = 0;
      let idx = 1;
      for (const li of node.children) {
        li.marker = node.type === "ol" ? `${idx++}.` : "•";
        this.layoutNode(li, 24, ly, node.w - 24);
        li.h = li.h || 20;
        ly += li.h;
      }
      node.h = Math.max(ly, 20);
      node.layoutDirty = false;
      return;
    }
    if (HTML4Rules.isInline(node)) {
      let ix = 0;
      let ih = 16;
      for (const c of node.children) {
        this.layoutNode(c, ix, 0, Math.max(12, node.w - ix));
        c.w = c.w || 24;
        c.h = c.h || 16;
        ix += c.w;
        ih = Math.max(ih, c.h);
      }
      node.h = ih;
      node.layoutDirty = false;
      return;
    }
    if (node.type === "img") {
      node.w = Number(node.props.width || node.props.w || node.w || 120);
      node.h = Number(node.props.height || node.props.h || node.h || 80);
      node.layoutDirty = false;
      return;
    }
    if (HTML4Rules.isHr(node)) {
      node.h = Number(node.props.h || 2);
      node.layoutDirty = false;
      return;
    }

    let cy = pad;
    for (const child of node.children) {
      this.layoutNode(child, pad, cy, node.w - pad * 2);
      cy += child.h || 20;
    }

    node.h = Number(node.props.h || Math.max(cy + pad, 24));
    node.layoutDirty = false;
  }
}

class RenderEngine {
  constructor(ctx = null) { this.ctx = ctx; this.lastFrame = []; }

  renderList(list, dirtyRects = []) {
    this.lastFrame = list.map((n) => ({ type: n.type, x: n.x, y: n.y, w: n.w, h: n.h, text: n.props.text || "" }));
    if (!this.ctx) return;

    if (!dirtyRects.length) this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    else for (const r of dirtyRects) this.ctx.clearRect(r.x, r.y, r.w, r.h);

    for (const n of list) {
      this.ctx.save();
      this.ctx.translate(n.x, n.y);

      if (n.type !== "text") {
        this.ctx.strokeStyle = n.focused ? "#00f" : "#333";
        this.ctx.strokeRect(0, 0, n.w || 80, n.h || 24);
      }

      if (n.type === "text") {
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(n.props.text || "", 0, 14);
      } else if (n.type === "a") {
        this.ctx.fillStyle = "blue";
        this.ctx.fillText(n.href || "link", 4, 14);
      } else if (n.type === "checkbox") {
        this.ctx.strokeRect(4, 4, 12, 12);
        if (n.checked) this.ctx.fillRect(7, 7, 6, 6);
      } else if (n.type === "radio") {
        this.ctx.beginPath();
        this.ctx.arc(10, 10, 7, 0, Math.PI * 2);
        this.ctx.stroke();
        if (n.checked) { this.ctx.beginPath(); this.ctx.arc(10, 10, 3, 0, Math.PI * 2); this.ctx.fill(); }
      } else if (n.type === "input" || n.type === "textarea") {
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(n.value || "", 4, 14);
      } else if (n.type === "img") {
        this.ctx.fillStyle = "#ccc";
        this.ctx.fillRect(0, 0, n.w || 120, n.h || 80);
        this.ctx.fillStyle = "#000";
        this.ctx.fillText((n.imageData && n.imageData.src) || n.props.src || "IMG", 4, 14);
      } else if (n.type === "iframe") {
        this.ctx.fillStyle = "#999";
        this.ctx.fillRect(0, 0, n.w || 120, n.h || 80);
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(`IFRAME:${n.props.src || ""}`, 4, 14);
      } else if (HTML4Rules.isHr(n)) {
        HRRenderer.draw(this.ctx, n);
      } else if (HTML4Rules.isCenter(n)) {
        this.ctx.textAlign = "center";
        this.ctx.fillText(n.props.text || "", (n.w || 120) / 2, 14);
      } else if (HTML4Rules.isMarquee(n)) {
        const t = Date.now() / 20;
        this.ctx.fillText(n.props.text || "", -(t % Math.max(1, n.w || 120)), 14);
      }
      if (n.marker) { this.ctx.fillStyle = "#000"; this.ctx.fillText(n.marker, -16, 14); }

      this.ctx.restore();
    }
  }
}

class FormControls {
  static serialize(formNode) {
    const out = {};
    const walk = (n) => {
      if (n.name && (n.type === "input" || n.type === "textarea" || n.type === "select" || n.type === "checkbox")) {
        out[n.name] = n.type === "checkbox" ? n.checked : n.value;
      }
      for (const c of n.children) walk(c);
    };
    walk(formNode);
    return out;
  }
}

class RadioGroup {
  static update(root, name, target) {
    const walk = (n) => {
      if (n.type === "radio" && n.name === name) n.checked = false;
      for (const c of n.children) walk(c);
    };
    walk(root);
    target.checked = true;
  }
}

class TimerSystem {
  constructor() { this.tasks = []; }
  setInterval(fn, ms) { this.tasks.push({ fn, ms, at: Date.now() }); }
  tick(now = Date.now()) {
    for (const t of this.tasks) {
      if (now - t.at >= t.ms) { t.at = now; t.fn(); }
    }
  }
}

class Clipboard {
  constructor() { this.text = ""; }
  copy(text) { this.text = String(text || ""); }
  paste() { return this.text; }
}

class FrameScheduler { constructor() { this.frames = 0; } next() { this.frames += 1; } }
class ScrollManager { static apply(node, dx = 0, dy = 0) { node.scrollX = (node.scrollX || 0) + dx; node.scrollY = (node.scrollY || 0) + dy; node.markDirty(); } }
class SelectionRange { constructor() { this.start = 0; this.end = 0; } set(s, e) { this.start = s; this.end = e; } }
class MutationQueue {
  constructor() { this.q = []; }
  append(parent, child) { this.q.push(() => parent.add(child)); }
  remove(node) { this.q.push(() => { if (!node.parent) return; const a = node.parent.children; const i = a.indexOf(node); if (i >= 0) a.splice(i, 1); node.parent.markDirty(); }); }
  flush() { for (const job of this.q) job(); this.q.length = 0; }
}
class ResourceLoader {
  constructor() { this.images = new Map(); this.pending = []; }
  loadImage(src, done) { this.pending.push({ src, done }); }
  get(src) { return this.images.get(src); }
  tick() {
    for (const p of this.pending) {
      const img = { src: p.src, width: 120, height: 80, loaded: true };
      this.images.set(p.src, img);
      if (p.done) p.done(img);
    }
    this.pending.length = 0;
  }
}
class AnimationQueue { constructor() { this.tasks = []; } add(fn) { this.tasks.push(fn); } tick() { for (const t of this.tasks) t(); } }
class ReflowQueue { constructor() { this.nodes = new Set(); } push(n) { this.nodes.add(n); } flush() { for (const n of this.nodes) n.markDirty(); this.nodes.clear(); } }
class RepaintQueue { constructor() { this.nodes = new Set(); } invalidate(n) { this.nodes.add(n); } flush(dirty) { for (const n of this.nodes) dirty.add(n.x, n.y, n.w || 1, n.h || 1); this.nodes.clear(); } }
class SecurityManager { static check(node) { return node.type !== "script"; } }
class NavigationController { constructor(history) { this.history = history; this.current = null; } go(url) { this.current = url; this.history.push(url); } }
class FormValidator { static validate(formNode) { return !!formNode; } }
class CursorManager { constructor() { this.current = "default"; } set(v) { this.current = v || "default"; } }
class HoverState { constructor() { this.target = null; } set(t) { this.target = t; } }
class Selection {
  constructor() { this.start = null; this.end = null; }
  set(start, end) { this.start = start; this.end = end; }
}
class TextSelectionPainter {
  static draw(ctx, selection) {
    if (!ctx || !selection?.start || !selection?.end) return;
    ctx.save();
    ctx.fillStyle = "rgba(0,120,255,0.25)";
    const x = Math.min(selection.start.x, selection.end.x);
    const y = Math.min(selection.start.y, selection.end.y);
    const w = Math.abs(selection.end.x - selection.start.x) || 1;
    const h = LineHeightResolver.compute({ style: {}, computed: { fontSize: 12 } });
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }
}
class InputBridge {
  constructor(kernel) {
    this.kernel = kernel;
    this.bound = false;
    this.handlers = {};
  }
  attach(target) {
    if (!target || this.bound) return;
    this.handlers.mousedown = (e) => this.kernel.dispatchPointer("mousedown", e.clientX, e.clientY);
    this.handlers.mouseup = (e) => this.kernel.dispatchPointer("mouseup", e.clientX, e.clientY);
    this.handlers.mousemove = (e) => this.kernel.dispatchPointer("mousemove", e.clientX, e.clientY);
    this.handlers.dblclick = (e) => this.kernel.dispatchPointer("dblclick", e.clientX, e.clientY);
    this.handlers.wheel = (e) => {
      const f = this.kernel.focus.current;
      if (!f) return;
      this.kernel.scroll(f, 0, e.deltaY || 0);
    };
    this.handlers.keydown = (e) => this.kernel.dispatchKey(e.key);
    for (const [k, fn] of Object.entries(this.handlers)) target.addEventListener(k, fn);
    this.bound = true;
    this.target = target;
  }
  detach() {
    if (!this.bound || !this.target) return;
    for (const [k, fn] of Object.entries(this.handlers)) this.target.removeEventListener(k, fn);
    this.bound = false;
    this.target = null;
    this.handlers = {};
  }
}
class UndoStack {
  constructor() { this.stack = []; this.i = -1; }
  push(state) { this.stack = this.stack.slice(0, this.i + 1); this.stack.push(state); this.i += 1; }
  undo() { return this.i > 0 ? this.stack[--this.i] : null; }
  redo() { return this.i < this.stack.length - 1 ? this.stack[++this.i] : null; }
}
class StyleSheet {
  constructor() { this.rules = []; }
  add(selector, style) { this.rules.push({ selector, style }); }
  apply(root) {
    const walk = (n) => {
      for (const r of this.rules) {
        if (CSSSelectorEngine.match(n, r.selector)) Object.assign(n.style, r.style);
      }
      for (const c of n.children) walk(c);
    };
    walk(root);
  }
}
class DOMMutation {
  static append(parent, child) { parent.add(child); }
  static remove(node) { if (!node.parent) return; const a = node.parent.children; const i = a.indexOf(node); if (i >= 0) a.splice(i, 1); node.parent.markDirty(); }
}
class AttributeSystem {
  static set(node, key, value) {
    if (key === "style" && typeof value === "string") {
      const parts = value.split(";");
      for (const p of parts) {
        const kv = p.split(":");
        if (kv.length === 2) node.style[kv[0].trim()] = kv[1].trim();
      }
    } else {
      node.props[key] = value;
      if (key === "value") node.value = String(value);
      if (key === "checked") node.checked = !!value;
      if (key === "href") node.href = String(value);
      if (key === "name") node.name = String(value);
    }
    node.markDirty();
  }
}
class CookieJar { constructor() { this.map = {}; } set(k, v) { this.map[k] = v; } get(k) { return this.map[k]; } }
class LocalCache { constructor() { this.map = new Map(); } set(k, v) { this.map.set(k, v); } get(k) { return this.map.get(k); } }
class DragDropManager { constructor() { this.dragging = null; } start(node) { this.dragging = node; } end() { this.dragging = null; } }
class PrintPipeline { static prepare(node) { node.printReady = true; } }
class IMEManager { constructor() { this.active = false; } start() { this.active = true; } end() { this.active = false; } }
class CharsetDecoder { static decode(s) { return String(s || ""); } }
class StreamParser { constructor() { this.buffer = ""; } push(d) { this.buffer += String(d || ""); } }
class WebSocketClient { constructor() { this.open = false; this.url = ""; } connect(url) { this.url = url; this.open = true; } }
class HTMLSerializer { static serialize(node) { return JSON.stringify(this.toJSON(node)); } static toJSON(node) { return { type: node.type, props: node.props, style: node.style, value: node.value, checked: node.checked, children: node.children.map((c) => this.toJSON(c)) }; } }
class DOMCloner { static clone(node) { return JSON.parse(JSON.stringify(HTMLSerializer.toJSON(node))); } }
class LayoutReflow { static trigger(node) { if (node && typeof node.markDirty === "function") node.markDirty(); } }
class AccessibilityFocus { static set(node) { if (node) node.ariaFocus = true; } }

class ImageMapEngine { static resolve(node) { if (node?.type === "map") node.resolved = true; } }
class AreaSelector { static hit(node, x, y) { if (!node || node.type !== "area") return false; const rx = Number(node.props.x || 0); const ry = Number(node.props.y || 0); const rw = Number(node.props.w || 0); const rh = Number(node.props.h || 0); return x >= rx && y >= ry && x <= rx + rw && y <= ry + rh; } }
class BaseFontResolver { static apply(node) { if (node?.type === "basefont") node.baseSize = Number(node.props.size || 3); } }
class HRRenderer { static draw(ctx, node) { if (!ctx || !node || node.type !== "hr") return; ctx.beginPath(); ctx.moveTo(0, (node.h || 2) / 2); ctx.lineTo(node.w || 120, (node.h || 2) / 2); ctx.stroke(); } }

class Viewport {
  constructor(w = 800, h = 600) { this.w = w; this.h = h; }
  resize(w, h) { this.w = w; this.h = h; }
}
class RenderStats {
  constructor() { this.frames = 0; this.lastMs = 0; this.start = 0; }
  begin() { this.start = Date.now(); }
  end() { this.frames += 1; this.lastMs = Date.now() - this.start; }
}

class StageBasedKernel {
  constructor(services = {}) {
    this.scene = services.scene || new SceneGraph(new Node("root", { w: 800, h: 600 }));
    this.input = services.input || new InputQueue();
    this.focus = services.focus || new FocusManager();
    this.history = services.history || new History();
    this.events = services.events || new EventSystem(this.focus, this.history);
    this.layout = services.layout || new LayoutEngine();
    this.render = services.render || new RenderEngine();
    this.scheduler = services.scheduler || new FrameScheduler();
    this.dirtyRegion = services.dirtyRegion || new DirtyRegion();
    this.timers = services.timers || new TimerSystem();
    this.clipboard = services.clipboard || new Clipboard();
    this.selectionRange = services.selectionRange || new SelectionRange();
    this.mutationQueue = services.mutationQueue || new MutationQueue();
    this.loader = services.loader || new ResourceLoader();
    this.animations = services.animations || new AnimationQueue();
    this.reflow = services.reflow || new ReflowQueue();
    this.repaint = services.repaint || new RepaintQueue();
    this.navigator = services.navigator || new NavigationController(this.history);
    this.cursor = services.cursor || new CursorManager();
    this.hover = services.hover || new HoverState();
    this.selection = services.selection || new Selection();
    this.inputBridge = services.inputBridge || new InputBridge(this);
    this.undoStack = services.undoStack || new UndoStack();
    this.styles = services.styles || new StyleSheet();
    this.cssom = services.cssom || new CSSOM();
    this.paintInvalidator = services.paintInvalidator || new PaintInvalidator();
    this.viewport = services.viewport || new Viewport(800, 600);
    this.stats = services.stats || new RenderStats();
    this.cookieJar = services.cookieJar || new CookieJar();
    this.localCache = services.localCache || new LocalCache();
    this.dd = services.dd || new DragDropManager();
    this.ime = services.ime || new IMEManager();
    this.stream = services.stream || new StreamParser();
    this.ws = services.ws || new WebSocketClient();

    this.stageAnchors = services.stageAnchors || new StageAnchorMap();
    this.layoutScheduler = services.layoutScheduler || new LayoutScheduler();
    this.renderScheduler = services.renderScheduler || new RenderScheduler();
    this.selectionDOMRange = services.selectionDOMRange || {};

    this.pipeline = new KernelPipeline();
    this.installDefaultStages();
    this._running = false;
  }

  static fromHTML(html, services = {}) {
    const root = HTMLParser.parse(html);
    return new StageBasedKernel({ ...services, scene: new SceneGraph(root) });
  }

  installDefaultStages() {
    this.pipeline
      .use(new KernelStage("S0_FOCUS_REBUILD", (ctx) => this.stageFocusRebuild(ctx)))
      .use(new KernelStage("S0A_STATS_BEGIN", (ctx) => this.stageStatsBegin(ctx)))
      .use(new KernelStage("S0B_MUTATION", (ctx) => this.stageMutation(ctx)))
      .use(new KernelStage("S1_INPUT", (ctx) => this.stageInput(ctx)))
      .use(new KernelStage("S2_HIT_TEST", (ctx) => this.stageHitTest(ctx)))
      .use(new KernelStage("S2B_HOVER", (ctx) => this.stageHover(ctx)))
      .use(new KernelStage("S3_EVENT_DISPATCH", (ctx) => this.stageDispatch(ctx)))
      .use(new KernelStage("S4_LAYOUT_INVALIDATE", (ctx) => this.stageInvalidate(ctx)))
      .use(new KernelStage("S4A_STYLE", (ctx) => this.stageStyle(ctx)))
      .use(new KernelStage("S4B_TIMER", (ctx) => this.stageTimers(ctx)))
      .use(new KernelStage("S4C_ANIMATION", (ctx) => this.stageAnimation(ctx)))
      .use(new KernelStage("S4D_RESOURCE", (ctx) => this.stageResource(ctx)))
      .use(new KernelStage("S4E_REFLOW", (ctx) => this.stageReflow(ctx)))
      .use(new KernelStage("S5_LAYOUT", (ctx) => this.stageLayout(ctx)))
      .use(new KernelStage("S6_RENDER_LIST", (ctx) => this.stageBuildRenderList(ctx)))
      .use(new KernelStage("S7_PAINT", (ctx) => this.stagePaint(ctx)))
      .use(new KernelStage("S7B_PRINT_PREP", (ctx) => this.stagePrintPrep(ctx)))
      .use(new KernelStage("S8_POST_FRAME", (ctx) => this.stagePostFrame(ctx)))
      .use(new KernelStage("S9_STATS_END", (ctx) => this.stageStatsEnd(ctx)));
  }

  useStage(name, run, index = this.pipeline.stages.length) { this.pipeline.stages.splice(index, 0, new KernelStage(name, run)); return this; }
  frame(frameTime = Date.now()) { const ctx = new PipelineContext(this, frameTime); this.pipeline.execute(ctx); return ctx; }
  submitForm(formNode) { return FormControls.serialize(formNode); }
  validateForm(formNode) { return FormValidator.validate(formNode); }
  serializeDOM(node) { return HTMLSerializer.serialize(node); }
  cloneNode(node) { return DOMCloner.clone(node); }
  triggerReflow(node) { LayoutReflow.trigger(node); }
  mutateAppend(parent, child) { this.mutationQueue.append(parent, child); }
  mutateRemove(node) { this.mutationQueue.remove(node); }
  createElement(type, props = {}) { return new Node(type, props); }
  setAttribute(node, key, value) { AttributeSystem.set(node, key, value); }
  loadImage(src, done) { this.loader.loadImage(src, done); }
  loadImageNode(node) {
    if (!node || node.type !== "img") return;
    const src = node.props.src || "";
    this.loader.loadImage(src, (img) => { node.imageData = img; node.markDirty(); });
  }
  scroll(node, dx, dy) { ScrollManager.apply(node, dx, dy); }
  dispatchPointer(type, x, y, detail = {}) { this.input.push(type, x, y, detail); }
  dispatchText(text) { this.input.push("input", 0, 0, { text }); }
  dispatchKey(key) { this.input.pushKey(key); }

  start(frameDriver = (cb) => setTimeout(cb, 16)) {
    if (this._running) return;
    this._running = true;
    const loop = () => {
      if (!this._running) return;
      this.frame(Date.now());
      frameDriver(loop);
    };
    frameDriver(loop);
  }

  stop() { this._running = false; }
  bindInput(target = (typeof window !== "undefined" ? window : null)) { this.inputBridge.attach(target); }
  unbindInput() { this.inputBridge.detach(); }
  addStyle(selector, style) { this.styles.add(selector, style); }
  addCascadeLayer(priority = 0) { const layer = new CascadeLayer(priority); this.cssom.addLayer(layer); return layer; }
  snapshot() {
    const dump = (n) => ({
      type: n.type,
      props: { ...n.props },
      style: { ...n.style },
      value: n.value,
      checked: n.checked,
      children: n.children.map(dump),
    });
    this.undoStack.push(JSON.stringify(dump(this.scene.root)));
  }
  undo() { return this.undoStack.undo(); }
  redo() { return this.undoStack.redo(); }
  resize(w, h) { this.viewport.resize(w, h); this.scene.root.props.w = w; this.scene.root.props.h = h; this.scene.root.markDirty(); }
  setCookie(k, v) { this.cookieJar.set(k, v); }
  getCookie(k) { return this.cookieJar.get(k); }
  cacheSet(k, v) { this.localCache.set(k, v); }
  cacheGet(k) { return this.localCache.get(k); }
  dragStart(node) { this.dd.start(node); }
  dragEnd() { this.dd.end(); }
  connectWebSocket(url) { this.ws.connect(url); }
  pushStream(data) { this.stream.push(data); }
  hitImageMap(areaNode, x, y) { return AreaSelector.hit(areaNode, x, y); }

  stageFocusRebuild(ctx) { this.focus.rebuild(ctx.root); }
  stageStatsBegin() { this.stats.begin(); }
  stageMutation() { this.mutationQueue.flush(); }
  stageInput(ctx) { ctx.events = this.input.poll(); }

  stageHitTest(ctx) {
    for (const event of ctx.events) {
      const target = event.type === "keydown"
        ? (this.focus.current || null)
        : HitTest.run(this.events, ctx.root, event.x, event.y);
      ctx.hitTargets.push({ event, target });
    }
  }
  stageHover(ctx) {
    for (const pair of ctx.hitTargets) {
      if (pair.event.type === "mousemove") {
        this.hover.set(pair.target || null);
        if (pair.target?.style?.cursor) this.cursor.set(pair.target.style.cursor);
        if (pair.target) this.events.dispatch("mouseover", pair.target, pair.event);
      }
    }
  }

  stageDispatch(ctx) {
    for (const pair of ctx.hitTargets) {
      this.events.dispatch(pair.event.type, pair.target, pair.event);
      if (pair.event.type === "keydown" && pair.target && HTML4Rules.isInput(pair.target)) {
        DOMRangeUpdater.update(this.selectionDOMRange, pair.target, (pair.target.value || "").length);
      }
      if (pair.event.type === "keydown" && pair.event.detail?.key === "Tab") {
        this.focus.next();
      }
      if (pair.event.type === "keydown" && pair.event.detail?.key === "Enter" && pair.target?.type === "form") {
        this.submitForm(pair.target);
      }
      if (pair.event.type === "keydown" && pair.event.detail?.key === "Process") this.ime.start();
      if (pair.event.type === "keyup" && pair.event.detail?.key === "Process") this.ime.end();
      if (pair.target && HTML4Rules.isRadio(pair.target) && pair.target.name && pair.event.type === "click") {
        RadioGroup.update(ctx.root, pair.target.name, pair.target);
      }
      if (pair.target && pair.target.type === "form" && pair.event.type === "submit" && this.validateForm(pair.target)) {
        this.submitForm(pair.target);
      }
      if (pair.target && pair.target.type === "a" && pair.event.type === "click" && pair.target.href) {
        this.navigator.go(pair.target.href);
      }
      if (pair.target && pair.event.type === "focus") AccessibilityFocus.set(pair.target);
      if (pair.target && pair.event.type === "selectstart") {
        this.selection.set({ x: pair.event.x, y: pair.event.y }, { x: pair.event.x, y: pair.event.y });
      }
      if (pair.target && pair.event.type === "selectmove" && this.selection.start) {
        this.selection.end = { x: pair.event.x, y: pair.event.y };
      }
      if (pair.target && HTML4Rules.isText(pair.target) && pair.event.type === "dblclick") {
        this.clipboard.copy(CharsetDecoder.decode(pair.target.props.text || ""));
      }
      if (pair.target) ctx.invalidNodes.push(pair.target);
    }
  }

  stageInvalidate(ctx) {
    for (const node of ctx.invalidNodes) {
      node.markDirty();
      this.dirtyRegion.add(node.x, node.y, node.w || 1, node.h || 1);
      this.reflow.push(node);
      this.layoutScheduler.schedule(node);
      this.repaint.invalidate(node);
      this.renderScheduler.schedule(node);
    }
  }

  stageStyle(ctx) {
    this.styles.apply(ctx.root);
    const walk = (n) => {
      this.cssom.apply(n);
      BaseFontResolver.apply(n);
      ImageMapEngine.resolve(n);
      for (const c of n.children) walk(c);
    };
    walk(ctx.root);
  }
  stageTimers() { this.timers.tick(); }
  stageAnimation() { this.animations.tick(); }
  stageResource() { this.loader.tick(); }
  stageReflow() { this.reflow.flush(); }

  stageLayout(ctx) {
    const applyCSS = (n, p) => { CSS.computeStyle(n, p); for (const c of n.children) applyCSS(c, n); };
    applyCSS(ctx.root, null);
    this.layout.compute(ctx.root, Number(ctx.root.props.w || 800));
  }
  stageBuildRenderList(ctx) { const walk = (n) => { ctx.renderList.push(n); for (const c of n.children) walk(c); }; walk(ctx.root); }
  stagePaint(ctx) {
    this.repaint.flush(this.dirtyRegion);
    for (const r of this.dirtyRegion.rects) this.paintInvalidator.invalidate(r.x, r.y, r.w, r.h);
    ctx.dirtyRects = this.dirtyRegion.rects.slice();
    this.paintInvalidator.flush(this.render.ctx);
    this.render.renderList(ctx.renderList, ctx.dirtyRects);
    TextSelectionPainter.draw(this.render.ctx, this.selection);
  }
  stagePrintPrep(ctx) { for (const n of ctx.renderList) PrintPipeline.prepare(n); }
  stagePostFrame() { this.layoutScheduler.flush(); this.renderScheduler.flush(); this.scheduler.next(); this.dirtyRegion.clear(); }
  stageStatsEnd() { this.stats.end(); }
}

module.exports = {
  Node, SceneGraph, HTML4Rules, HTMLParser, History, FocusManager,
  CSS, TextEngine, CSSSelectorEngine, DOMAPI,
  PipelineContext, KernelStage, KernelPipeline,
  InputQueue, EventSystem, DirtyRegion, LayoutEngine, RenderEngine,
  FormControls, RadioGroup, TimerSystem, Clipboard,
  FrameScheduler, ScrollManager, SelectionRange, MutationQueue, ResourceLoader,
  AnimationQueue, ReflowQueue, RepaintQueue, SecurityManager, NavigationController,
  FormValidator, CursorManager, HoverState, Selection, TextSelectionPainter, InputBridge, StageBasedKernel,
  UndoStack, StyleSheet, DOMMutation,
  Viewport, RenderStats,
  AttributeSystem,
  CookieJar, LocalCache, DragDropManager, PrintPipeline, IMEManager, CharsetDecoder, StreamParser, WebSocketClient,
  HTMLSerializer, DOMCloner, LayoutReflow, AccessibilityFocus,
  ImageMapEngine, AreaSelector, BaseFontResolver, HRRenderer,
  CascadeLayer, CSSOM, LineHeightResolver, PaintInvalidator,
  StageAnchorMap, EventPropagation, HitTest, LayoutScheduler, RenderScheduler, DOMRangeUpdater,
};
