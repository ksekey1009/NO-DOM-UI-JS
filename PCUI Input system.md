# PCUI Input System - Part 1A: Keyboard & IME Input Architecture

## 🎯 Goal

The PCUI input system bypasses the browser’s default input handling (including OS IME) to provide a **custom FSM-based input engine** that ensures:

- Accurate keyboard input handling with IME support
- Explicit management of modifier keys and toggle states
- Consistent input handling across multiple languages (English, Korean, Vietnamese)
- Chromium V8 and legacy browser bug mitigation

---

## 1️⃣ Key Features

| Feature                  | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| Bitmask State Tracking    | Manages Shift / Ctrl / Alt / CapsLock / Meta / IME toggle using bit flags  |
| RUN Flag Structure        | Flattened nested switch-case control with early exit logic                  |
| INPUT Gating              | Processes a single key event per frame to prevent duplicate handling       |
| Chromium Bug Mitigation   | No return inside switch-case; single return point per function             |
| IME Composition Management| Supports consonant/vowel/final composition for Korean, Vietnamese, and English |

---

## 2️⃣ State Variables & Flags

| State / Variable   | Role                                            |
|-------------------|------------------------------------------------|
| INPUT             | Determines whether the key event can be accepted |
| bitmask           | Tracks modifier key states                       |
| #linow            | Current active language code (`en`, `ko`, `vn`) |
| #c_, #v_, #c2     | Currently composing characters                 |
| RUN / RUN2 / RUN3 | Controls nested switch-case execution          |
| RETURN point      | Ensures function always returns at a single location |

---

## 3️⃣ Event Flow

### Keydown

1. Check `INPUT` → exit if already processed  
2. Collect key information (`keyCode`, `key`, `location`)  
3. Set modifier bitmask  
4. Handle IME toggle → update `#linow`  
5. Character keys → call `public_input()` for composition  
6. `preventDefault()` to block default behavior  
7. Return at a single exit point  

### Keyup

1. Clear relevant modifier bits  
2. Maintain composition state (do not commit)  
3. `preventDefault()`  
4. Return  

### Composition Logic

- IME input → validate → RUN → switch-case  
- Update `#c_`, `#v_`, `#c2` or commit/reset  
- `preedit` → temporary composed string for display  
- Finalized characters committed to output  

---

## 4️⃣ Summary

- Keyboard + IME input is handled entirely by the **PCUI FSM engine**  
- All **modifier keys and composition states** are explicitly tracked via **bitmask and RUN flags**  
- **Chromium / V8 bug mitigation**: no return inside switch-case, single exit points  
- Supports **English, Korean, and Vietnamese** input with proper composition logic

> Part 1B will provide **example code and detailed explanation** for this system.

---

# PCUI Input System - Part 1B: Keyboard & IME Input Example Code & Explanation

## 🎯 Overview

This document provides example code demonstrating the **PCUI Keyboard & IME input handling**. It shows how to manage key events, modifier keys, and IME composition using bitmasks and RUN flags.

---

## 1️⃣ Example: Simplified IME Engine

```js
class PCUI_IME {
  #linow = 'en';          // Current language
  #c_ = '';               // Initial consonant
  #v_ = '';               // Vowel
  #c2 = '';               // Final consonant
  #bitmask = 0;           // Modifier keys (Shift, Ctrl, etc.)
  #inputLocked = false;   // INPUT gating

  constructor() {}

  // Main input processing function
  public_input(iarr) {
    const [keyCode, key, location] = iarr;

    // Single input per frame
    if (this.#inputLocked) return;
    this.#inputLocked = true;

    // Update modifier bitmask
    if (key === 'Shift') this.#bitmask |= 0x01;
    if (key === 'Ctrl') this.#bitmask |= 0x02;

    // Handle language toggle (example)
    if (key === 'CapsLock') this.#linow = this.#linow === 'en' ? 'ko' : 'en';

    // Process character input
    switch (this.#linow) {
      case 'en':
        this.commitChar(key);
        break;

      case 'ko':
        this.composeKorean(key);
        break;

      case 'vn':
        this.composeVietnamese(key);
        break;
    }

    // Single exit point
    this.#inputLocked = false;
  }

  commitChar(char) {
    console.log('Committed:', char);
  }

  composeKorean(char) {
    // Simplified composition logic
    if (!this.#c_) this.#c_ = char;
    else if (!this.#v_) this.#v_ = char;
    else this.#c2 = char;

    console.log('Korean composition:', this.#c_, this.#v_, this.#c2);
  }

  composeVietnamese(char) {
    // Simplified Vietnamese composition
    console.log('Vietnamese composition:', char);
  }

  keyup(key) {
    if (key === 'Shift') this.#bitmask &= ~0x01;
    if (key === 'Ctrl') this.#bitmask &= ~0x02;
  }
}


// Example usage
const ime = new PCUI_IME();
document.addEventListener('keydown', (e) => ime.public_input([e.keyCode, e.key, e.location]));
document.addEventListener('keyup', (e) => ime.keyup(e.key));
```

---

## 2️⃣ Explanation

**Input Gating**
 - #inputLocked ensures one key event per frame
 - Prevents duplicate processing of rapid key events

**Bitmask Modifier Tracking**
 - `#bitmask` stores Shift / Ctrl states using bits
 - Example: `0x01 = Shift, 0x02 = Ctrl`

Allows efficient checking of modifier keys in composition

**Language Mode**
 - `#linow` determines the current input language: en, ko, vn
 - Language toggle (CapsLock example) updates this variable

**Composition Logic**
 - English: commit immediately
 - Korean: simple consonant-vowel-final tracking using `#c_`, `#v_`, `#c2`
 - Vietnamese: placeholder composition logic

**Switch-Case + RUN Flag Concept**
 - The switch(`this.#linow`) demonstrates flattened FSM control
 - Real implementation uses multiple RUN flags for nested scenarios
 - Single return point ensures Chromium V8 safety

---

## 3️⃣ Summary

 - This example shows a simplified, AI-friendly IME input engine
 - Demonstrates bitmask modifiers, language switching, and composition
 - Switch-case structure + single exit point prevents engine corruption on V8
 - Full PCUI IME uses more complex RUN flags and FSM for multi-step composition

---

# PCUI Input System - Part 2A: Pointer / Touch / Mouse Input Architecture

## 🎯 Overview

This document describes the design of the **PCUI Pointer / Touch / Mouse input system**. The system handles multi-input devices efficiently using a **slot-based FSM approach** and bitmask tracking.

---

## 1️⃣ Core Principles

| Principle                  | Description |
|----------------------------|-------------|
| Pointer-centric processing  | PointerEvent is the standard; slots track pointerId, position, type, and optional metadata |
| TouchEvent compatibility   | Legacy support; internal logic unified with PointerEvent |
| Mouse standalone handling   | Single pointer only; minimal memory usage; own RUN flags |
| FSM + RUN flags             | All inputs follow a **switch-case + RUN flag** structure for predictable control |
| Independent state tracking  | Mouse, Touch, Pointer each maintain independent variables but can integrate when needed |

---

## 2️⃣ Event Categories & Bitmask

| Input Type | Events | Bitmask Example (16bit) | Purpose |
|------------|--------|------------------------|---------|
| Mouse      | mousedown, mousemove, mouseup | 0x8000, 0x2000, 0x4000 | Single-pointer focus/drag/release |
| Touch      | touchstart, touchmove, touchend | 0x0200, 0x0100, 0x0080 | Multi-touch support |
| Pointer    | pointerdown, pointermove, pointerup | 0x0040, 0x0020, 0x0010 | Unified handling for multi-input devices |

- **Bitmask tracking** allows efficient state checking and combination without complex conditionals.

---

## 3️⃣ Slot-based FSM Concept

- Each active pointer is assigned a **slot** indexed by `pointerId`
- Each slot maintains independent **RUN flags**: `RUN`, `RUN2`, `RUN3`  
- Example: `let RUN, RUN2; RUN = RUN2 = true;`
- FSM pipeline handles **focus → move/drag → release** for each slot  
- No duplication of FSM for multi-pointer handling; only slots expand

---

## 4️⃣ Input Handling Flow

```
Pointer / Touch / Mouse Event
↓
Slot Identification (find existing / empty slot)
↓
Update RUN flags & bitmask
↓
Focus / Move / Drag / Release FSM
↓
Update rendering loop
```

### Mouse

- Single pointer only  
- Separate RUN flags  
- Minimal memory footprint

### Touch

- Multiple slots for each touch point  
- Unified FSM with pointer events

### Pointer

- Single or multi-pointer support  
- Slot-based tracking ensures independent event handling

---

## 5️⃣ Key Design Notes

1. **RUN flag system** ensures deep switch-case structures do not break V8 optimization  
2. **Bitmasking** replaces multiple if checks for event type/status  
3. **Slot expansion** allows multi-touch without duplicating FSM logic  
4. All inputs are independent but can be integrated for multi-pointer gestures

---

## 6️⃣ Summary

- PCUI pointer system uses **slot-based FSM + bitmask flags** for robust handling  
- Mouse, Touch, Pointer are unified conceptually but maintain independent states  
- Designed for **legacy browser support**, multi-pointer expansion, and **V8 engine safety**

---

# PCUI Input System - Part 2B: Pointer / Touch / Mouse Input Example & Explanation

## 🎯 Overview

This document provides a **practical example** of handling Pointer / Touch / Mouse events in PCUI using **slot-based FSM + RUN flags + bitmask**.  
It demonstrates how events are assigned to slots, RUN flags are updated, and bitmask is used for state tracking.

---

## 1️⃣ Slot Initialization & RUN Flags

```js
// Maximum 10 slots for pointers
const pointerSlots = Array(10).fill(null);
const slotBitmask = Array(10).fill(0);

// Example RUN flags
let RUN, RUN2;
RUN = RUN2 = true;  // Both flags start as active
```
 - `RUN` and `RUN2` control flow within FSM for each pointer slot
 - Bitmask tracks event state (down, move, up)

---

## 2️⃣ Pointer Event Listener Example

```js
function handlePointerEvent(e) {
    let slotIndex = pointerSlots.findIndex(s => s && s.id === e.pointerId);
    if (slotIndex === -1) slotIndex = pointerSlots.findIndex(s => s === null);
    if (slotIndex === -1) return; // No available slot

    let slot = pointerSlots[slotIndex];

    switch(e.type) {
        case 'pointerdown':
            pointerSlots[slotIndex] = { id: e.pointerId, x: e.offsetX, y: e.offsetY };
            slotBitmask[slotIndex] |= 0x40; // Down bit
            RUN = true;
            break;

        case 'pointermove':
            if (slot) {
                slot.prevX = slot.x;
                slot.prevY = slot.y;
                slot.x = e.offsetX;
                slot.y = e.offsetY;
                slotBitmask[slotIndex] |= 0x20; // Move bit
                RUN2 = true;
            }
            break;

        case 'pointerup':
            slotBitmask[slotIndex] |= 0x10; // Up bit
            pointerSlots[slotIndex] = null; // Clear slot
            RUN = RUN2 = false;
            break;
    }
}
```

---

## 3️⃣ Explanation

### Slot Management

 - Each pointer has its own slot to track state and coordinates.
 - If a pointerId already exists, reuse its slot; otherwise, find an empty one.

### RUN Flags

 - `RUN` controls whether the FSM should process the current event.
 - `RUN2` can be used for additional conditional processing inside deep switch-case structures.

### Bitmasking

 - Efficiently tracks the event type/state: down (0x40), move (0x20), up (0x10)
 - Can combine multiple states without multiple if checks.

### FSM Processing

 - Each pointer event goes through a single switch-case for its type.
 - Using RUN flags prevents multiple updates within the same frame.

---

## 4️⃣ Integration with Rendering Loop

```js
function update() {
    pointerSlots.forEach((slot, i) => {
        if (!slot) return;
        if (slotBitmask[i] & 0x20) {
            console.log(`Pointer ${slot.id} moved from (${slot.prevX},${slot.prevY}) to (${slot.x},${slot.y})`);
            slotBitmask[i] &= ~0x20; // Clear move bit after processing
        }
    });
}

function renderLoop() {
    update();
    requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);
```

 - Only active move events are processed each frame
 - Slots maintain independent pointer states
 - `RUN` flags can gate whether events are processed per pointer or per slot

---

### 5️⃣ Summary

 - This example demonstrates slot-based FSM handling for Pointer / Touch / Mouse input
 - RUN flags + bitmask ensure event consistency and prevent multi-processing in the same frame
 - Architecture supports multi-pointer/multi-touch expansion without duplicating FSM logic

---

# 📘 PCUI Input System – Part 3A: Multi-Pointer / Touch FSM Design

## 1️⃣ Overview

 - The multi-pointer and multi-touch input handling in PCUI is designed to:
 - Track pointer/touch events independently per slot
 - Manage simultaneous multi-inputs using FSM + RUN flags
 - Prevent event conflicts and state corruption via independent slot structure
 - Handle all events through a single entry point (`listen()` function)

---

## 2️⃣ Slot-Based Architecture

|Concept					|Description|
|---------------------------|-----------|
|PointerSlot / TouchSlot	|Independently tracks each pointer/touch input, storing previous and current coordinates|
|RUN / RUN2 / RUN3			|FSM flags controlling stages: Down → Move → Up|
|Slot Array					|Holds up to N slots. Distinguishes active vs empty slots|
|Event Bitmask				|Identifies event types (PointerDown/Move/Up, TouchStart/Move/End) for continuous handling|

---

## 3️⃣ FSM Control Flow

```
Pointer / Touch Event
       ↓
Identify Slot (existing or empty)
       ↓
RUN flags check
       ↓
switch(event.type):
    case DOWN:
        set RUN
        update slot
    case MOVE:
        update position
        check drag
    case UP / CANCEL:
        clear RUN
        reset slot
       ↓
Update canvas / render
```

**Key Points**

 - `RUN` flags manage event stage safely
 - Each slot’s FSM is independent → no multi-pointer conflicts
 - Bitmask is used to verify event type and control consecutive processing

---

## 4️⃣ Multi-Touch Expansion

 - Assign one slot per pointer / touch ID
 - Can scale to increased number of events without duplicating FSM
 - Integrates seamlessly with single-pointer FSM

---

# 📘 PCUI Input System – Part 3B: Conceptual Example Code

## 1️⃣ Pointer/Touch Slot Example

```js
// Slot placeholder for multiple pointers/touches
class InputSlot {
    constructor(id, x, y, type='pointer') {
        this.id = id;
        this.prev = [x, y];
        this.curr = [x, y];
        this.type = type;
        this.RUN = true;
    }
    update(x, y) {
        this.prev = this.curr;
        this.curr = [x, y];
    }
}

// Array of slots for multi-pointer support
let slots = Array(10).fill(null);

function listenEvent(e) {
    let idx = slots.findIndex(s => s && s.id === e.pointerId)
            || slots.findIndex(s => s === null);

    if (idx === null) return;

    let slot = slots[idx];

    switch(e.type) {
        case 'pointerdown':
            slots[idx] = new InputSlot(e.pointerId, e.offsetX, e.offsetY);
            console.log('DOWN', idx);
            break;
        case 'pointermove':
            if (slot && slot.RUN) slot.update(e.offsetX, e.offsetY);
            console.log('MOVE', idx);
            break;
        case 'pointerup':
        case 'pointercancel':
            slots[idx] = null;
            console.log('UP', idx);
            break;
    }
}
```

---

## 2️⃣ Conceptual Explanation

 - InputSlot: Independently tracks each pointer/touch with a RUN flag
 - slots array: Holds up to 10 slots; empty slots are reused
 - FSM Flow: DOWN → MOVE → UP stage-wise processing
 - Multi-pointer Safety: Using PointerSlot prevent input collision
 - Concept Example: Actual implementation may add bitmask tracking, drag detection, and complex FSM logic

---

# 📘 PCUI Input System – Part 4A: Keyboard + IME Integration

## 1️⃣ Overview

PCUI keyboard input system integrates IME composition logic for multiple languages (Korean, Vietnamese, English) while maintaining a deterministic FSM.

**Key Goals:**

 - Completely bypass browser/OS IME for custom input handling
 - Track and manage modifier keys and language modes
 - Ensure stable composition for multi-character input
 - Mitigate Chromium / V8 engine bugs related to switch-case early returns

---

## 2️⃣ Core Design Principles

|Principle	|Description|
|-----------|-----------|
|FSM-based Handling |Keyboard events are processed via a RUN flag-driven switch-case pipeline|
|Bitmask Modifier Management	|Shift, Ctrl, Alt, CapsLock, and IME toggle are tracked with bitmasks|
|Single Return Point	|Avoids partial return in nested switch-cases to mitigate V8 issues|
|IME Composition	|Maintains separate state for initial, medial, final characters (`#c_`, `#v_`, `#c2`)|
|Input Gating	|INPUT flag ensures one key is processed per frame to avoid duplicates|

---

## 3️⃣ Keyboard / IME Event Flow

```
Keydown
    ↓
Check INPUT flag
    ↓
Update bitmask (Shift, Ctrl, Alt, IME)
    ↓
Determine language (`#linow`) and key type
    ↓
public_input(iarr)
    ↓
  - Compose / preedit / commit
    ↓
Update UI
Keyup
    ↓
Clear modifier bits
    ↓
Maintain composition
```

**Key Notes:**

 - `public_input()` is the master controller for composition
 - Separate logic exists for English direct input vs compositional languages
 - Backspace triggers `#rb_composition()` to revert partially composed characters
 - `RUN` flags flatten nested switch-case complexity, avoiding V8 compilation errors

---

# 📘 PCUI Input System – Part 4B: Keyboard + IME Conceptual Example

## 1️⃣ IME Slot and Composition Example

```js
class IMEState {
    constructor(lang='en') {
        this.lang = lang;      // 'en', 'ko', 'vn'
        this.c_ = '';          // initial consonant
        this.v_ = '';          // vowel
        this.c2 = '';          // final consonant
        this.commit = '';      // finalized text
        this.preedit = '';     // composing text
        this.RUN = true;       // FSM control flag
        this.INPUT = true;     // gating for single key per frame
        this.modifier = 0;     // bitmask for Shift/Ctrl/Alt
    }

    public_input(key) {
        if (!this.INPUT) return;

        switch(this.lang) {
            case 'en':
                this.commit += key;
                this.preedit = '';
                break;
            case 'ko':
                // Simplified Korean composition
                if (!this.c_) this.c_ = key;
                else if (!this.v_) this.v_ = key;
                else this.c2 = key;

                this.preedit = this.c_ + this.v_ + (this.c2 || '');
                if (this.c_ && this.v_ && this.c2) {
                    this.commit += this.preedit;
                    this.c_ = this.v_ = this.c2 = '';
                    this.preedit = '';
                }
                break;
            case 'vn':
                // Simplified Vietnamese composition (tone + vowel)
                this.preedit = key; 
                this.commit += key;
                break;
        }
    }

    backspace() {
        // Simplified rollback for composition
        if (this.c2) this.c2 = '';
        else if (this.v_) this.v_ = '';
        else if (this.c_) this.c_ = '';
        this.preedit = this.c_ + this.v_ + (this.c2 || '');
    }
}
```

---

## 2️⃣ Conceptual Explanation

 - IMEState: Represents a per-language composition engine
 - `RUN` flag & `INPUT` flag: Control switch-case execution and frame gating
 - `public_input(e)`: Processes a key input and updates composition or preedit-rollback or commit
 - Backspace handling: Reverts last composed character in the sequence
 - Multi-language support: Example shows English, Korean (simplified), Vietnamese

# 📘 PCUI Integrated Event Handling & Canvas Rendering Part 5A (Concept / Architecture)

## Overview

This document provides a conceptual overview of how keyboard, IME, pointer, touch, and mouse events are integrated in a canvas-based UI system. It focuses on **FSM-based input handling, slot-based pointer tracking**, and **synchronized rendering loop integration**.

## Core Concepts

1. Unified FSM Input Handling
 - Keyboard, IME, pointer, touch, and mouse inputs all use a **flag-driven, switch-case finite state machine (FSM)** structure.
 - Each input type maintains independent **RUN flags** for state control.

2. Slot-Based Multi-Pointer Tracking
 - Each active pointer or touch event is stored in a **PointerSlot**.
 - Slots maintain previous and current coordinates, type, and optional flags.
 - Supports scalable **multi-touch and multi-pointer** interactions without duplicating FSM logic.

3. Bitmask Event Management
 - Each event (down, move, up, cancel) uses **unique bit flags**.
 - Multiple events can be combined for compound states (e.g., dragging = down | move).
 - FSM checks bitmask flags per slot to determine action.

4. Rendering Loop Synchronization
 - Event updates are separated from rendering to prevent performance bottlenecks.
 - Per-frame flags (e.g., move-event limiter, INPUT gating) are reset within the rendering loop.
 - Ensures **consistent state across all input types** per frame.

## Event Flow Overview

```
Keyboard / IME
   ↓
bitmask / RUN flags → | public_input() | → | composition / preedit |
   ↓
Canvas rendering

Pointer / Touch / Mouse
   ↓
slot-based RUN flags → 	| handle_down / handle_move	|
						| handle_drag / handle_up	|
   ↓
Canvas rendering
```

 - All input is independent but **synchronized with the same rendering cycle**.
 - Chromium / V8 quirks (switch-case return issues, deep branching) are mitigated by **flattened FSM + single return points**.

## Best Practices
 - Keep event handling separate from rendering; FSMs only modify state, rendering reads state.
 - Use RUN flags and per-slot bitmasks to track input independently per device and per pointer.
 - Ensure one update cycle per frame; prevent duplicate key/move processing.
 - Structure the FSM to allow easy integration of new input types or languages.

---

# 📘 PCUI Integrated Event Handling & Canvas Rendering Part 5B (Example / AI-Friendly Code)

```js
// Part 5B: AI-Friendly Example of Integrated Event Handling

class PointerSlot {
    constructor(id, x, y, type = 'pointer') {
        this.id = id;
        this.prev = [x, y];
        this.curr = [x, y];
        this.type = type;
        this.bitmask = 0;  // Down / Move / Up / Cancel flags
    }

    update(x, y) {
        this.prev = this.curr;
        this.curr = [x, y];
    }

    setFlag(flag) { this.bitmask |= flag; }
    clearFlag(flag) { this.bitmask &= ~flag; }
    hasFlag(flag) { return (this.bitmask & flag) !== 0; }
}

// Event flag constants
const POINTER_DOWN = 0x40;
const POINTER_MOVE = 0x20;
const POINTER_UP = 0x10;

// Integrated System Class
class CanvasSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pointerSlots = Array(10).fill(null); // Max 10 pointers
        this.moveLimiter = false;

        this.listen = this.listen.bind(this);
        this.update = this.update.bind(this);

        canvas.addEventListener('pointerdown', this.listen);
        canvas.addEventListener('pointermove', this.listen);
        canvas.addEventListener('pointerup', this.listen);
    }

    findSlot(id) {
        return this.pointerSlots.findIndex(s => s && s.id === id);
    }

    findEmptySlot() {
        return this.pointerSlots.findIndex(s => s === null);
    }

    listen(e) {
        let slotIndex = this.findSlot(e.pointerId) ?? this.findEmptySlot();
        if (slotIndex === null) return;

        let slot = this.pointerSlots[slotIndex];

        switch(e.type) {
            case 'pointerdown':
                this.pointerSlots[slotIndex] = new PointerSlot(e.pointerId, e.offsetX, e.offsetY);
                this.pointerSlots[slotIndex].setFlag(POINTER_DOWN);
                break;
            case 'pointermove':
                if (slot) slot.update(e.offsetX, e.offsetY);
                if (slot) slot.setFlag(POINTER_MOVE);
                break;
            case 'pointerup':
                if (slot) slot.setFlag(POINTER_UP);
                this.pointerSlots[slotIndex] = null;
                break;
        }
    }

    update() {
        // Process input states per frame
        this.pointerSlots.forEach(slot => {
            if (!slot) return;
            if (slot.hasFlag(POINTER_DOWN)) {
                console.log(`Pointer ${slot.id} down at`, slot.curr);
                slot.clearFlag(POINTER_DOWN);
            }
            if (slot.hasFlag(POINTER_MOVE)) {
                console.log(`Pointer ${slot.id} moving from`, slot.prev, 'to', slot.curr);
                slot.clearFlag(POINTER_MOVE);
            }
            if (slot.hasFlag(POINTER_UP)) {
                console.log(`Pointer ${slot.id} up at`, slot.curr);
                slot.clearFlag(POINTER_UP);
            }
        });
    }

    startLoop() {
        const loop = () => {
            this.update();  // Update FSM & input states
            requestAnimationFrame(loop);  // Next frame
        }
        requestAnimationFrame(loop);
    }
}

// Usage
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const system = new CanvasSystem(canvas);
system.startLoop();
```

## Notes
 - Each **PointerSlot** tracks its own state with bitmask flags for AI pattern recognition.
 - `update()` function acts as the **FSM per-frame processor**.
 - Input handling is **separate from rendering**, but can be integrated into a full UI render cycle.
 - This design supports **multi-pointer, touch**, and **mouse** input in a unified system.