// PCUI 0.1 - Data-first kernel-oriented layout
// NOTE: UI class is lightweight facade; mutation authority belongs to managers/DataManager.

class ui_ {
  static UIBASE = 0;

  #idx;
  #t;
  #scratch2;
  #scratch4;

  constructor(idx, typeId = ui_.UIBASE) {
    const ok = Number.isInteger(idx) && idx >= 0 && idx < DataManager.get_CLOUI();
    if (!ok) throw new RangeError('ui_: invalid idx');
    if (!Number.isInteger(typeId) || typeId < 0) throw new RangeError('ui_: invalid typeId');

    this.#idx = idx;
    this.#t = typeId;
    this.#scratch2 = new Uint32Array(2);
    this.#scratch4 = new Uint32Array(4);
    Object.seal(this);
  }

  get_idx() { return this.#idx; }
  get_t() { return this.#t; }
  get_uid() { return DataManager.get_uid(this.#idx); }
  get_pidx() { return DataManager.get_pidx(this.#idx); }
  get_x() { return DataManager.get_x(this.#idx); }
  get_y() { return DataManager.get_y(this.#idx); }
  get_w() { return DataManager.get_w(this.#idx); }
  get_h() { return DataManager.get_h(this.#idx); }

  get_coord(output = this.#scratch2) {
    DataManager.get_coord(this.#idx, output);
    return output;
  }

  get_area(output = this.#scratch2) {
    DataManager.get_area(this.#idx, output);
    return output;
  }

  get_rect(output = this.#scratch4) {
    DataManager.get_rect(this.#idx, output);
    return output;
  }

  get_state1() { return DataManager.state1(this.#idx); }
  get_state2() { return DataManager.state2(this.#idx); }

  set_customState1(bit32) { DataManager.setCustomState1(bit32, this.#idx); }
  get_customState1() { return DataManager.getCustomState1(this.#idx); }

  set_customState2(bit32) { DataManager.setCustomState2(bit32, this.#idx); }
  get_customState2() { return DataManager.getCustomState2(this.#idx); }

  // manager capability gate driven by type-id
  can_use(managerFunctionId) {
    return DataManager.canTypeUse(this.#t, managerFunctionId);
  }

  get_policy() {
    return {
      managerMask: DataManager.get_type_manager_mask(this.#t),
      featureMask: DataManager.get_type_feature_mask(this.#t),
      numericUnit: DataManager.getNumericUnit(this.#t),
    };
  }

  can_copy_text() {
    return DataManager.canTypeUseFeature(this.#t, DataManager.FEATURE.TEXT_COPY);
  }

  can_edit_text() {
    return DataManager.canTypeUseFeature(this.#t, DataManager.FEATURE.TEXT_EDIT);
  }

  get_numeric_unit() {
    return DataManager.getNumericUnit(this.#t);
  }

  static ACFE() {
    DataManager.ACG();
  }
}

class DataManager {
  static #CLOUI = 10000;
  static OPCODE = Object.freeze({
    CMD_MASK: 0x000000FF,
    DEBUG_MASK: 0x00000F00,
    ERROR_MASK: 0x0000F000,
    CUSTOM_MASK: 0xFFFF0000,
    CMD_SHIFT: 0,
    DEBUG_SHIFT: 8,
    ERROR_SHIFT: 12,
    CUSTOM_SHIFT: 16,
  });
  static #HANDSHAKE_IDLE = 0;
  static #HANDSHAKE_PARAM_READY = 1;
  static #HANDSHAKE_PROCESSING_DONE = 2;
  static FEATURE = Object.freeze({
    TEXT_COPY: 1,
    TEXT_EDIT: 2,
    NUMERIC_BIT: 10,
    NUMERIC_NIBBLE: 11,
    NUMERIC_BYTE: 12,
    NUMERIC_WORD: 13,
    NUMERIC_DWORD: 14,
  });
  static NUMERIC_UNIT = Object.freeze({
    BIT: 1,
    NIBBLE: 4,
    BYTE: 8,
    WORD: 16,
    DWORD: 32,
  });

  // Core state region (long-lived)
  static #uid = new Uint32Array(DataManager.#CLOUI);
  static #pidx = new Uint32Array(DataManager.#CLOUI);
  static #x = new Uint32Array(DataManager.#CLOUI);
  static #y = new Uint32Array(DataManager.#CLOUI);
  static #w = new Uint32Array(DataManager.#CLOUI);
  static #h = new Uint32Array(DataManager.#CLOUI);
  static #state1 = new Uint32Array(DataManager.#CLOUI);
  static #state2 = new Uint32Array(DataManager.#CLOUI);
  static #customState1 = new Uint32Array(DataManager.#CLOUI);
  static #customState2 = new Uint32Array(DataManager.#CLOUI);

  // command parameters are ephemeral, but stored in reusable slots to avoid churn
  static #parameters = null;
  static #parameterSignature = 0;
  static #commitState = DataManager.#HANDSHAKE_IDLE;
  static #container = new Array(4).fill(null);
  static #parameterScratch = new Uint32Array(4); // [idx, opcode, p0, p1]
  // typed-array policy region (Map/Set 금지)
  static #typeManagerMask = new Uint32Array(DataManager.#CLOUI);
  static #typeFeatureMask = new Uint32Array(DataManager.#CLOUI);
  static #typeNumericUnit = new Uint32Array(DataManager.#CLOUI);

  static get_CLOUI() { return DataManager.#CLOUI; }

  static #idxValChk(idx) {
    return Number.isInteger(idx) && idx >= 0 && idx < DataManager.#CLOUI;
  }

  static #ensureU32Pair(output) {
    return output instanceof Uint32Array && output.length === 2;
  }

  static #ensureU32Rect(output) {
    return output instanceof Uint32Array && output.length === 4;
  }

  static set_parameters(...args) {
    // compatibility entry
    const idx = Number.isInteger(args[0]) ? args[0] : 0;
    const fn = Number.isInteger(args[1]) ? args[1] : 0;
    const p0 = Number.isInteger(args[2]) ? args[2] : 0;
    const p1 = Number.isInteger(args[3]) ? args[3] : 0;
    DataManager.set_parameter_slot(idx, fn, p0, p1);
  }

  static set_parameter_slot(idx, fn, p0, p1) {
    DataManager.#parameterScratch[0] = idx >>> 0;
    DataManager.#parameterScratch[1] = fn >>> 0; // opcode
    DataManager.#parameterScratch[2] = p0 >>> 0;
    DataManager.#parameterScratch[3] = p1 >>> 0;
    DataManager.#parameters = DataManager.#parameterScratch;
    DataManager.#parameterSignature = DataManager.#makeParameterSignature(DataManager.#parameterScratch);
    DataManager.#commitState = DataManager.#HANDSHAKE_PARAM_READY;
  }

  static make_opcode(commandState, debugState, errorState, customState) {
    return (((commandState << DataManager.OPCODE.CMD_SHIFT) & DataManager.OPCODE.CMD_MASK)
      | ((debugState << DataManager.OPCODE.DEBUG_SHIFT) & DataManager.OPCODE.DEBUG_MASK)
      | ((errorState << DataManager.OPCODE.ERROR_SHIFT) & DataManager.OPCODE.ERROR_MASK)
      | ((customState << DataManager.OPCODE.CUSTOM_SHIFT) & DataManager.OPCODE.CUSTOM_MASK)) >>> 0;
  }
  static decode_command_state(opcode) { return (opcode & DataManager.OPCODE.CMD_MASK) >>> DataManager.OPCODE.CMD_SHIFT; }
  static decode_debug_state(opcode) { return (opcode & DataManager.OPCODE.DEBUG_MASK) >>> DataManager.OPCODE.DEBUG_SHIFT; }
  static decode_error_state(opcode) { return (opcode & DataManager.OPCODE.ERROR_MASK) >>> DataManager.OPCODE.ERROR_SHIFT; }
  static decode_custom_state(opcode) { return (opcode & DataManager.OPCODE.CUSTOM_MASK) >>> DataManager.OPCODE.CUSTOM_SHIFT; }

  static peek_parameters() {
    return DataManager.#parameters;
  }

  static clear_parameters() {
    DataManager.#parameters = null;
    DataManager.#parameterSignature = 0;
  }

  static get_commit_state() {
    return DataManager.#commitState;
  }

  static get_parameter_signature() {
    return DataManager.#parameterSignature;
  }

  static handshake_mark_processed() {
    if (DataManager.#commitState === DataManager.#HANDSHAKE_PARAM_READY) {
      DataManager.#commitState = DataManager.#HANDSHAKE_PROCESSING_DONE;
      return true;
    }
    return false;
  }

  static handshake_finalize_commit() {
    if (DataManager.#commitState === DataManager.#HANDSHAKE_PROCESSING_DONE) {
      DataManager.#commitState = DataManager.#HANDSHAKE_IDLE;
      return true;
    }
    return false;
  }

  static force_reset_commit_state() {
    DataManager.#commitState = DataManager.#HANDSHAKE_IDLE;
    return true;
  }

  static #makeParameterSignature(args) {
    if (!Array.isArray(args) && !(args instanceof Object)) return 0;
    const idx = Number.isInteger(args[0]) ? args[0] & 0xFFFF : 0;
    const fn = Number.isInteger(args[1]) ? args[1] & 0xFFFF : 0;
    return ((fn << 16) | idx) >>> 0;
  }

  static commit_processed_packet(packet) {
    if (!(packet instanceof Uint32Array) || packet.length < 7) return false;
    const idx = packet[0];
    if (!DataManager.#idxValChk(idx)) return false;

    if (packet[1] === 1) {
      DataManager.#x[idx] = packet[5] >>> 0;
      DataManager.#y[idx] = packet[6] >>> 0;
    }
    if (packet[2] === 1) {
      DataManager.#w[idx] = packet[5] >>> 0;
      DataManager.#h[idx] = packet[6] >>> 0;
    }
    if (packet[3] === 1) {
      DataManager.#customState1[idx] = packet[5] & 0x7FFFFFFF;
    }
    if (packet[4] === 1) {
      DataManager.#customState2[idx] = packet[5] & 0x7FFFFFFF;
    }
    return true;
  }

  // minimal profile API for 초기 단계
  static set_type_profile(typeId, managerMask, featureMask, numericUnit) {
    if (!Number.isInteger(typeId) || typeId < 0 || typeId >= DataManager.#CLOUI) return false;
    DataManager.#typeManagerMask[typeId] = managerMask >>> 0;
    DataManager.#typeFeatureMask[typeId] = featureMask >>> 0;
    DataManager.#typeNumericUnit[typeId] = numericUnit >>> 0;
    return true;
  }

  static canTypeUse(typeId, managerFunctionId) {
    if (!Number.isInteger(typeId) || typeId < 0 || typeId >= DataManager.#CLOUI) return false;
    if (!Number.isInteger(managerFunctionId) || managerFunctionId < 0 || managerFunctionId > 31) return false;
    return ((DataManager.#typeManagerMask[typeId] >>> managerFunctionId) & 1) === 1;
  }

  static canTypeUseFeature(typeId, featureId) {
    if (!Number.isInteger(typeId) || typeId < 0 || typeId >= DataManager.#CLOUI) return false;
    if (!Number.isInteger(featureId) || featureId < 0 || featureId > 31) return false;
    return ((DataManager.#typeFeatureMask[typeId] >>> featureId) & 1) === 1;
  }

  static getNumericUnit(typeId) {
    if (!Number.isInteger(typeId) || typeId < 0 || typeId >= DataManager.#CLOUI) return 0;
    return DataManager.#typeNumericUnit[typeId];
  }

  static get_type_manager_mask(typeId) {
    if (!Number.isInteger(typeId) || typeId < 0 || typeId >= DataManager.#CLOUI) return 0;
    return DataManager.#typeManagerMask[typeId];
  }

  static get_type_feature_mask(typeId) {
    if (!Number.isInteger(typeId) || typeId < 0 || typeId >= DataManager.#CLOUI) return 0;
    return DataManager.#typeFeatureMask[typeId];
  }

  // direct scalar refs: avoids returning subarray wrappers on hot path
  static get_uid(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#uid[idx]; }
  static get_pidx(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#pidx[idx]; }
  static get_x(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#x[idx]; }
  static get_y(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#y[idx]; }
  static get_w(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#w[idx]; }
  static get_h(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#h[idx]; }

  static get_coord(idx, output) {
    if (!DataManager.#idxValChk(idx) || !DataManager.#ensureU32Pair(output)) return false;
    output[0] = DataManager.#x[idx];
    output[1] = DataManager.#y[idx];
    return true;
  }

  static get_area(idx, output) {
    if (!DataManager.#idxValChk(idx) || !DataManager.#ensureU32Pair(output)) return false;
    output[0] = DataManager.#w[idx];
    output[1] = DataManager.#h[idx];
    return true;
  }

  static get_rect(idx, output) {
    if (!DataManager.#idxValChk(idx) || !DataManager.#ensureU32Rect(output)) return false;
    output[0] = DataManager.#x[idx];
    output[1] = DataManager.#y[idx];
    output[2] = DataManager.#w[idx];
    output[3] = DataManager.#h[idx];
    return true;
  }

  static state1(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#state1[idx] & 0x7FFFFFFF; }
  static state2(idx) { if (!DataManager.#idxValChk(idx)) return 0; return DataManager.#state2[idx] & 0x7FFFFFFF; }

  static setCustomState1(bit32, idx) {
    if (!DataManager.#idxValChk(idx) || !Number.isInteger(bit32)) return false;
    DataManager.#customState1[idx] = bit32 & 0x7FFFFFFF;
    return true;
  }

  static getCustomState1(idx) {
    if (!DataManager.#idxValChk(idx)) return 0;
    return DataManager.#customState1[idx] & 0x7FFFFFFF;
  }

  static setCustomState2(bit32, idx) {
    if (!DataManager.#idxValChk(idx) || !Number.isInteger(bit32)) return false;
    DataManager.#customState2[idx] = bit32 & 0x7FFFFFFF;
    return true;
  }

  static getCustomState2(idx) {
    if (!DataManager.#idxValChk(idx)) return 0;
    return DataManager.#customState2[idx] & 0x7FFFFFFF;
  }

  static ACG() {
    // abstract-class gateway only stores parameters.
    return DataManager.#parameters;
  }
}

// Processing-specialized manager:
// scans DataManager parameter area -> processes -> commits back to DataManager.
class ProcessingManager {
  static #PATTERN_SET_COORD = 0x00010000;
  static #PATTERN_SET_AREA = 0x00020000;
  static #PATTERN_SET_CS1 = 0x00030000;
  static #PATTERN_SET_CS2 = 0x00040000;
  static #renderOrderScratch = new Uint32Array(256);
  static #renderCount = 0;
  static #processedPacket = new Uint32Array(7);
  static #pipelineState = new Uint32Array(8); // [validated, opcodeOk, ready, read, processed, valid, written, committed]
  // packet layout: [idx, hasCoord, hasArea, hasCS1, hasCS2, v0, v1]
  static #loopViewport = new Uint32Array(4);
  static #loopDirty = null;

  static scan_and_process_once() {
    // unified path wrapper
    return ProcessingManager.run_pipeline_once();
  }

  // 큰 단위 파이프라인 실행:
  // 입력검증 -> OPCODE분기 -> 커밋ready -> 읽기/복사 -> 가공 -> 유효성검증 -> 쓰기요청 -> done -> idle
  static process_commit_render_pipeline_once(renderQueue, queueCount) {
    const S = ProcessingManager.#pipelineState;
    S[0] = 0; S[1] = 0; S[2] = 0; S[3] = 0; S[4] = 0; S[5] = 0; S[6] = 0; S[7] = 0;

    // 1) 입력데이터 검증
    const params = DataManager.peek_parameters();
    if (!(params instanceof Uint32Array) || params.length < 4) return false;
    const idx = params[0];
    const opcode = params[1];
    const p0 = params[2];
    const p1 = params[3];
    if (!Number.isInteger(idx) || !Number.isInteger(opcode)) return false;
    S[0] = 1;

    // 2) OPCODE 분기 사전 판정
    const cmd = DataManager.decode_command_state(opcode);
    const signature = DataManager.get_parameter_signature();
    if (!ProcessingManager.#should_process(signature)) return false;
    if (cmd < 1 || cmd > 4) return false;
    S[1] = 1;

    // 3) 커밋 ready 확인
    if (DataManager.get_commit_state() !== 1) return false;
    S[2] = 1;

    // 4) 메모리 읽기/복사 (slot -> local)
    const localIdx = idx >>> 0;
    const localP0 = p0 >>> 0;
    const localP1 = p1 >>> 0;
    S[3] = 1;

    // 5) 데이터 가공 (packet 생성)
    const okProcess = ProcessingManager.#run_abstract_function(localIdx, cmd, localP0, localP1, ui_.UIBASE);
    if (!okProcess) return false;
    S[4] = 1;

    // 6) 데이터 유효성 검증
    const packet = ProcessingManager.#processedPacket;
    if (!(packet instanceof Uint32Array) || packet[0] !== localIdx) return false;
    S[5] = 1;

    // 7) 메모리 쓰기-보존 요청
    const okCommit = DataManager.commit_processed_packet(packet);
    if (!okCommit) return false;
    S[6] = 1;

    // 8) 커밋 done
    if (!DataManager.handshake_mark_processed()) return false;
    // 9) 커밋 idle
    DataManager.clear_parameters();
    if (!DataManager.handshake_finalize_commit()) return false;
    S[7] = 1;

    // 10) 렌더 업데이트 루프
    ProcessingManager.collaborate_render_update(renderQueue, queueCount);
    return true;
  }

  // 단일 실행 경로: 렌더 준비 + 처리/커밋/렌더 파이프라인
  static run_pipeline_once() {
    ProcessingManager.prepare_render_materials_prior_loop_void();
    return ProcessingManager.process_commit_render_pipeline_once(
      ProcessingManager.get_render_order_buffer(),
      ProcessingManager.get_render_order_count()
    );
  }

  // ProcessingManager <-> RenderManager 협업 전용 진입점
  static collaborate_render_update(renderQueue, queueCount) {
    RenderManager.render_update_loop(renderQueue, queueCount);
  }

  static #should_process(signature) {
    const masked = signature & 0xFFFF0000;
    return masked === ProcessingManager.#PATTERN_SET_COORD
      || masked === ProcessingManager.#PATTERN_SET_AREA
      || masked === ProcessingManager.#PATTERN_SET_CS1
      || masked === ProcessingManager.#PATTERN_SET_CS2;
  }

  static #run_abstract_function(idx, abstractFnId, p0, p1, uiTypeId) {
    // ui.t-based direct branching + opcode branching
    // (minimal helper usage by design)
    const typeId = Number.isInteger(uiTypeId) ? uiTypeId : ui_.UIBASE;
    const p = ProcessingManager.#processedPacket;
    p[0] = idx >>> 0;
    p[1] = 0; p[2] = 0; p[3] = 0; p[4] = 0; p[5] = 0; p[6] = 0;

    if (typeId === ui_.UIBASE) {
      switch (abstractFnId) {
        case 1: // set coord
          p[1] = 1;
          p[5] = p0 >>> 0;
          p[6] = p1 >>> 0;
          return true;
        case 2: // set area
          p[2] = 1;
          p[5] = p0 >>> 0;
          p[6] = p1 >>> 0;
          return true;
        case 3: // set custom state 1
          p[3] = 1;
          p[5] = p0 & 0x7FFFFFFF;
          return true;
        case 4: // set custom state 2
          p[4] = 1;
          p[5] = p0 & 0x7FFFFFFF;
          return true;
        default:
          return null;
      }
    }

    // non-base type: policy-guard then process
    if (!DataManager.canTypeUse(typeId, abstractFnId)) return null;

    // abstractFnId dispatch (integer-only path)
    switch (abstractFnId) {
      case 1: // set coord
        p[1] = 1;
        p[5] = p0 >>> 0;
        p[6] = p1 >>> 0;
        return true;
      case 2: // set area
        p[2] = 1;
        p[5] = p0 >>> 0;
        p[6] = p1 >>> 0;
        return true;
      case 3: // set custom state 1
        p[3] = 1;
        p[5] = p0 & 0x7FFFFFFF;
        return true;
      case 4: // set custom state 2
        p[4] = 1;
        p[5] = p0 & 0x7FFFFFFF;
        return true;
      default:
        return null;
    }
  }

  // must run once per frame right before render reflection.
  // keeps loop recoverable even if unexpected bugs/freezes occur.
  static force_reset_before_render() {
    return DataManager.force_reset_commit_state();
  }

  // called before render loop tick: collect and order render-needed indices
  static prepare_render_materials_prior_loop(dirtyList, viewportRect) {
    ProcessingManager.#renderCount = 0;
    if (!(dirtyList instanceof Uint32Array)) return 0;
    if (!(viewportRect instanceof Uint32Array) || viewportRect.length !== 4) return 0;

    const vx = viewportRect[0];
    const vy = viewportRect[1];
    const vw = viewportRect[2];
    const vh = viewportRect[3];
    const vx2 = vx + vw;
    const vy2 = vy + vh;

    for (let i = 0; i < dirtyList.length && ProcessingManager.#renderCount < ProcessingManager.#renderOrderScratch.length; i++) {
      const idx = dirtyList[i];
      if (!Number.isInteger(idx)) continue;

      const rect = RenderManager.borrow_rect_scratch();
      if (!DataManager.get_rect(idx, rect)) continue;
      const rx = rect[0];
      const ry = rect[1];
      const rw = rect[2];
      const rh = rect[3];
      const rx2 = rx + rw;
      const ry2 = ry + rh;

      const intersects = !(rx2 < vx || ry2 < vy || rx > vx2 || ry > vy2);
      if (!intersects) continue;

      ProcessingManager.#renderOrderScratch[ProcessingManager.#renderCount++] = idx;
    }

    // simple ascending order for stable deterministic rendering
    for (let i = 0; i < ProcessingManager.#renderCount - 1; i++) {
      for (let j = i + 1; j < ProcessingManager.#renderCount; j++) {
        if (ProcessingManager.#renderOrderScratch[i] > ProcessingManager.#renderOrderScratch[j]) {
          const t = ProcessingManager.#renderOrderScratch[i];
          ProcessingManager.#renderOrderScratch[i] = ProcessingManager.#renderOrderScratch[j];
          ProcessingManager.#renderOrderScratch[j] = t;
        }
      }
    }

    return ProcessingManager.#renderCount;
  }

  static get_render_order_buffer() {
    return ProcessingManager.#renderOrderScratch;
  }

  static get_render_order_count() {
    return ProcessingManager.#renderCount;
  }

  static set_render_loop_context(dirtyList, viewportRect) {
    ProcessingManager.#loopDirty = dirtyList instanceof Uint32Array ? dirtyList : null;
    if (viewportRect instanceof Uint32Array && viewportRect.length === 4) {
      ProcessingManager.#loopViewport[0] = viewportRect[0] >>> 0;
      ProcessingManager.#loopViewport[1] = viewportRect[1] >>> 0;
      ProcessingManager.#loopViewport[2] = viewportRect[2] >>> 0;
      ProcessingManager.#loopViewport[3] = viewportRect[3] >>> 0;
    }
  }

  static prepare_render_materials_prior_loop_void() {
    if (!ProcessingManager.#loopDirty) {
      ProcessingManager.#renderCount = 0;
      return;
    }
    ProcessingManager.prepare_render_materials_prior_loop(
      ProcessingManager.#loopDirty,
      ProcessingManager.#loopViewport
    );
  }
}

// Render manager: reads/consumes only.
// Copies only required data into temporary scratch and performs rendering.
class RenderManager {
  static #rectScratch = new Uint32Array(4);
  static #renderMaterialScratch = new Uint32Array(8);
  static #MAX_RENDER_MATERIALS = 256;
  static #materialStride = 8;
  static #materialBuffer = new Uint32Array(RenderManager.#MAX_RENDER_MATERIALS * RenderManager.#materialStride);
  static #materialCount = 0;
  static #frameHash = 0;
  static #prevFrameHash = 0;

  static borrow_rect_scratch() {
    return RenderManager.#rectScratch;
  }

  static render_update_loop(renderQueue, queueCount) {
    // frame-safety handshake reset right before render reflection
    ProcessingManager.force_reset_before_render();
    RenderManager.prepare_frame_materials(renderQueue, queueCount);

    // no visual change => skip expensive backend draw phase.
    if (!RenderManager.should_render()) return;

    for (let i = 0; i < RenderManager.#materialCount; i++) {
      const base = i * RenderManager.#materialStride;
      RenderManager.#renderMaterialScratch[0] = RenderManager.#materialBuffer[base + 0];
      RenderManager.#renderMaterialScratch[1] = RenderManager.#materialBuffer[base + 1];
      RenderManager.#renderMaterialScratch[2] = RenderManager.#materialBuffer[base + 2];
      RenderManager.#renderMaterialScratch[3] = RenderManager.#materialBuffer[base + 3];
      RenderManager.#renderMaterialScratch[4] = RenderManager.#materialBuffer[base + 4];
      RenderManager.#renderMaterialScratch[5] = RenderManager.#materialBuffer[base + 5];
      RenderManager.#renderMaterialScratch[6] = RenderManager.#materialBuffer[base + 6];
      RenderManager.#renderMaterialScratch[7] = RenderManager.#materialBuffer[base + 7];
      // NOTE: actual backend draw call is intentionally external boundary.
    }
  }

  static prepare_frame_materials(renderQueue, queueCount) {
    RenderManager.#materialCount = 0;
    let hash = 2166136261 >>> 0;

    for (let i = 0; i < queueCount && RenderManager.#materialCount < RenderManager.#MAX_RENDER_MATERIALS; i++) {
      const idx = renderQueue[i];
      if (!DataManager.get_rect(idx, RenderManager.#rectScratch)) continue;

      const matIdx = RenderManager.#materialCount;
      const base = matIdx * RenderManager.#materialStride;

      // consume-only copy into persistent material region (no per-frame alloc)
      RenderManager.#materialBuffer[base + 0] = idx >>> 0;
      RenderManager.#materialBuffer[base + 1] = RenderManager.#rectScratch[0];
      RenderManager.#materialBuffer[base + 2] = RenderManager.#rectScratch[1];
      RenderManager.#materialBuffer[base + 3] = RenderManager.#rectScratch[2];
      RenderManager.#materialBuffer[base + 4] = RenderManager.#rectScratch[3];
      RenderManager.#materialBuffer[base + 5] = DataManager.state1(idx);
      RenderManager.#materialBuffer[base + 6] = DataManager.state2(idx);
      RenderManager.#materialBuffer[base + 7] = DataManager.get_uid(idx);

      hash ^= RenderManager.#materialBuffer[base + 0]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 1]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 2]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 3]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 4]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 5]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 6]; hash = Math.imul(hash, 16777619) >>> 0;
      hash ^= RenderManager.#materialBuffer[base + 7]; hash = Math.imul(hash, 16777619) >>> 0;

      RenderManager.#materialCount++;
    }
    RenderManager.#frameHash = hash >>> 0;
  }

  static should_render() {
    const changed = RenderManager.#frameHash !== RenderManager.#prevFrameHash;
    RenderManager.#prevFrameHash = RenderManager.#frameHash;
    return changed;
  }

  static get_material_count() {
    return RenderManager.#materialCount;
  }

  static get_material_buffer() {
    return RenderManager.#materialBuffer;
  }

  static get_frame_hash() {
    return RenderManager.#frameHash;
  }

  static get_prev_frame_hash() {
    return RenderManager.#prevFrameHash;
  }

  static reset_frame_hashes() {
    RenderManager.#frameHash = 0;
    RenderManager.#prevFrameHash = 0;
  }
}

// IME는 별도 수명주기/버퍼 규칙을 가지는 별도 매니저로 분리 예정.
class IMEManager {}
