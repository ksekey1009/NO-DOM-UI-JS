# PCUI INPUT SYSTEM.md PART START

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

 ---

# PCUI INPUT SYSTEM.md PART END

---

### Multi-pointer & Drag/Focus Handling Improvements: Detailed Summary

---

### **1️⃣ Basic Structure**

* **Input Slot (PSlot) Based Management:**
  Each pointer (whether mouse, touch, or stylus) is managed independently in its own "slot." This allows for individual handling of each input device, preventing any interference between them.

* **Bit-based State Management:**
  The system uses a bitmask to represent the state of each slot:

  * **Down bit**: Indicates when a pointer is in the "Down" state, which could be the start of a click or drag action.
  * **Move bit**: Indicates when the pointer is moving.
  * **PS/PSCHK**: Flags used to track whether the slot is valid or needs to be checked.
  * **FSM + RUN Flag Structure**: Manages whether to process an event or not at each stage based on the state of each pointer's slot.

This structure allows for clean, independent handling of each pointer's state and action, avoiding conflicts or unnecessary checks between different inputs.

---

### **2️⃣ Key Improvements Today**

#### **2-1. Drag / Move Coordinate Handling:**

* **Issue:** Previously, applying a distance threshold for drag caused inaccurate coordinate updates.
* **Improvement:**

  * **Cumulative delta-based update**: Instead of applying the threshold directly to the coordinates, the system now accumulates changes (deltas) in position as long as the Down bit is active. This ensures smoother and more accurate movement.
  * **Result:** The drag behavior now feels much more natural and precise, especially during long-distance drags, similar to how UI systems (e.g., Windows) handle drag events.
  * **Drag is a mode, not an event**

#### **2-2. Focus Handling Fix:**

* **Issue:** The focus state was often lost when the pointer moved, due to improper setting of the **PS** and **PSCHK** flags during the move phase.
* **Improvement:**

  * Ensured that **PS** (Slot Validity) and **PSCHK** (Slot Check) flags are properly set at the start of each move or drag action.
  * By making the slot state consistently accessible during event handling, the system can now maintain focus on the correct UI elements, even during complex drag operations.
  * **Result:** This fix eliminates focus loss during continuous drag, improving the user experience when interacting with dynamic UI elements.

#### **2-3. Up Event Optimization:**

* **Issue:** Up events were being unnecessarily processed, especially in cases where the system didn’t need to handle a click action.
* **Improvement:**

  * The need for the **Up** event is eliminated in drag-and-drop scenarios where only the **Down** event is needed to start the drag. When the **Down bit** is turned off, the system assumes a drop has occurred automatically, making **Up events** redundant.
  * **Result:** This reduces the complexity and overhead of event processing, streamlining the drag-and-drop handling process.

#### **2-4. Hover / Tooltip Handling Separation:**

* **Issue:** During a drag operation, tooltips and hover interactions would sometimes be triggered, which could interfere with the drag behavior.
* **Improvement:**

  * The system now distinguishes between drag and hover/tooltip logic:

    * **Down bit ON:** Only handles drag events.
    * **Down bit OFF + Move bit ON:** Handles hover/tooltip events.
  * **Result:** This separation ensures that tooltips don’t appear while dragging, but hover behavior continues normally when not dragging, improving user interface consistency.

---

### **3️⃣ Event State FSM Summary**

The event handling state machine (FSM) works based on the combination of the **Down** and **Move** bits, resulting in different states:

| **Down bit** | **Move bit** | **Logic**                 | **Notes**                     |
| ------------ | ------------ | ------------------------- | ----------------------------- |
| 1            | 1            | Drag (update coordinates) | Tooltip is hidden during drag |
| 1            | 0            | Waiting for click         | Pre-drag state                |
| 0            | 1            | Hover / Tooltip           | Not dragging                  |
| 0            | 0            | Idle                      | No active event               |

* **Down bit = 1, Move bit = 1 (Drag)**: The system updates the drag coordinates and hides tooltips.
* **Down bit = 1, Move bit = 0 (Waiting for click)**: In the pre-drag state, waiting for the initial drag action.
* **Down bit = 0, Move bit = 1 (Hover/Tooltip)**: Hover or tooltip actions are triggered when not dragging.
* **Down bit = 0, Move bit = 0 (Idle)**: No active events; the system is idle.

---

### **4️⃣ Core Improvements**

* **Clear Slot Flags (PS, PSCHK):**
  These flags are consistently cleared and accessible throughout the Move/Drag logic. This ensures that slot validity and checks are properly handled, addressing focus-related issues that were previously present.

* **Cumulative Delta-based Move Coordinates:**
  By using a cumulative delta approach, the system ensures smoother pointer movement even when distance thresholds are in place. The result is a more intuitive and fluid drag experience.

* **Down bit-based Event Gating:**
  This mechanism ensures that drag handling is strictly separated from hover interactions. When the **Down bit** is on (indicating an active drag), hover events are ignored, preventing unintended tooltips or hover effects during a drag operation.

* **Drag/Drop Without Up Events:**
  The system now no longer relies on **Up events** to complete the drag operation. The **Down bit OFF** automatically signals a drop, simplifying the drag-and-drop logic.

* **Slot/Bit-based FSM:**
  The state machine is based on a slot and bit approach, which works independently for each pointer, supporting multi-pointer, touch, and mouse inputs. This makes the system more flexible, allowing for complex input scenarios without conflicts between different pointers or devices.

---

### ✅ **Conclusion**

Today’s improvements significantly enhanced the drag-and-drop experience by focusing on better coordinate accuracy, stable focus handling, and effective separation between drag and hover/tooltip interactions. The system is now more streamlined, with the elimination of unnecessary Up events and a more efficient event handling process. The multi-pointer and multi-input structure is now stable and flexible, capable of handling complex scenarios without interference, making it ideal for more interactive and dynamic user interfaces.

---

### Event Handling Structure: Detailed Overview

---

### **1️⃣ Event Handling Structure**

#### **1-1. #handle_event Pattern**

* **Event Handling Flow:**
  The event handling logic uses **switch** statements exclusively, avoiding the complexity of `if` conditions. This makes the flow clear, consistent, and easier to manage.

  * **Pointer, Mouse, and Touch Events:** The system classifies and processes events based on a category identifier (`cat`), which can range from 0 to 7.
  * **Flags and Bitmasks:** The events are managed with flags (`UL`, `EFFOFF`, `MEL`) and bitmasks. These help in flexibly handling and organizing different types of events.
* **Example Events and Flag Management:**

  * **Pointer Leave:** When a pointer leaves an element, the system sets `EFFOFF = true` and `UL = true`, then resets the bitmask.
  * **Pointer Over:** When a pointer hovers over an element, `UL = false` is set, and the bitmask is reset.
  * **Advantage:** The primary benefit of this approach is that it makes the event-handling structure shallow (easy to extend) and clear, as it reduces the depth of logic branching in the code.

#### **1-2. Unified vs Separate Handlers**

* **Separate Handlers for Complex Events:**
  Move, Drag, and Down events have dedicated functions (`#handle_move`, `#handle_drag`) due to their complexity. These events often require:

  * **Coordinate updates**
  * **Cumulative value calculations**
  * **Flag management** for event processing.
* **Unified Handler for Other Events:**
  Other types of events, such as `leave`, `enter`, `wheel`, and `cancel`, are handled by the single function `#handle_event`. These events typically involve simpler flag toggling or bitmask resetting, rather than the need for extensive coordinate updates.

---

### **2️⃣ PointerSlot Class (PSlot)**

#### **2-1. Main Private Fields**

The `PointerSlot` class (PSlot) holds key properties to manage event states for individual pointers, touch, or mouse inputs:

* **#id:** Unique identifier for each pointer slot.
* **#prev:** Previous position (x, y) of the pointer.
* **#curr:** Current position (x, y) of the pointer.
* **#type:** Type of pointer (e.g., mouse, touch, stylus).
* **#color:** Visual identifier (used for debugging or display purposes).
* **#effoff:** The **Effect OFF flag**, which determines if the pointer slot should be ignored for certain updates (e.g., when a drag has ended).
* **#ulock:** The **Update Lock** flag. If `true`, this prevents updates to the pointer slot’s coordinates (useful for controlling when a pointer's movement is processed).
* **#pend:** Flag indicating if an event is potentially pending for the slot. This is still under discussion for finer control.

#### **2-2. Getters and Setters**

To manage the flags effectively, the `PointerSlot` class provides the following getter and setter methods:

* **set_effoff**, **get_effoff:** To set and retrieve the `EFFOFF` flag.
* **set_ulock**, **get_ulock:** To set and retrieve the `ULOCK` flag.

The **UL** and **EFFOFF** flags are crucial for controlling whether coordinate updates for move/drag events are processed.

---

### **3️⃣ Listening Event Processing**

#### **3-1. Event Classification**

The event system classifies events based on the type of pointer input:

* **Pointer (p)**
* **Mouse (m)**
* **Touch (t)**

Each event type is further parsed to determine specific flags, such as:

* **Down, Move, Up, Leave, Over, Enter, Cancel, Out, Wheel, ContextMenu**
  These flags indicate the state of the pointer and whether an event actually occurred.

* **`any_event` Flag:**
  This flag checks whether any event has actually occurred for a specific pointer. If `any_event` is `false`, no further processing is required.

#### **3-2. Bitmask Handling**

Bitmask handling is used to classify and manage the movement and interaction states for pointer, mouse, and touch events:

* **Pointer/Mouse Bitmasks:**

  * `PMMOVEJ`, `PMNMOVE`, `PMNDRAG`, `PMDOWN`, `PMMOVEBS`, `PMDRAGBS`
* **Touch Bitmasks:**

  * `TNMOVE`, `TNDRAG`, `TDOWN`, `TMOVEBS`

**CDTJ (Coordinate Distance Threshold Judge):**
Before updating any coordinates or triggering movement/drag events, the system checks whether the movement magnitude exceeds a certain threshold (distance squared `d2 >= D2`). This prevents unnecessary updates when the movement is too small to warrant a change.

#### **3-3. PointerSlot Creation and Update**

* **PSA Retrieval and Update:**

  * **`get_psa(idx)`** is used to fetch the current pointer slot for a given index.
  * If no pointer slot exists for the given index, a new `PointerSlot` is created.
  * If the slot exists and `UL = false`, the slot is updated with the new position (`update_psa(idx, x, y)`).
  * If the slot exists and **`MEL = true`**, it directly sets the current position using `set_curr_pos(x, y)`.

This process ensures that pointer slots are efficiently managed and updated based on event states and flags.

---

### **4️⃣ CDTJ Function (Coordinate Distance Threshold Judge)**

The **CDTJ** function computes the squared distance `d2 = dx² + dy²` between the previous and current pointer positions.

* **Threshold Check:**
  The function only triggers a move or drag event if the distance exceeds the pre-defined threshold squared distance `D2`.
* **Effectiveness:**
  This mechanism prevents unnecessary updates by ignoring small movements that don’t meet the threshold, thus optimizing performance and reducing unnecessary event triggers.

---

### **5️⃣ #handle_move / #handle_drag**

The handling of **Move** and **Drag** events is separated to provide targeted logic:

* **`#handle_drag`:**
  This function is responsible for determining the target element based on the current drag operation. It uses a priority list, UI list, and focus list to decide the appropriate action. For example:

  * **Bar UI:** If the target is a bar UI, it will call `parent.move_by(dx, dy)` to move the bar based on the drag delta.
* **`#handle_move`:**
  This function mainly prepares for coordinate updates, calculating necessary values. Most of its logic is currently commented out, focusing primarily on preparing the system for future updates.

---

### **6️⃣ Flag-Based Architecture Advantages**

The architecture using flags like **UL**, **MEL**, **EFFOFF**, and the **PSA bitmask** brings several benefits:

* **Easy Event Extension:**
  New event types can be added without changing the fundamental structure. Flags and bitmasks can be easily extended to accommodate new input types or event behaviors.

* **Simplified Logic:**
  Using a **switch** statement for handling events keeps the codebase clean, with minimal nesting and branching. This makes the logic simple to follow, debug, and maintain.

* **Integration of Complex Logic:**
  The separate handling of **Move/Drag/Down** events allows for complex coordinate and flag management, while the unified event handler (`#handle_event`) deals with simpler event types. This design ensures the system is both flexible and maintainable.

---

### **7️⃣ Additional Notes**

* **Event Handling Complexity:**
  The entire event-handling code is around **6600 lines of JavaScript**, making it too complex for free AI tools to fully analyze. These tools are better suited for documentation, summarization, and reviewing high-level structure rather than detailed, context-sensitive analysis of large codebases.

* **Limitations of AI Tools:**
  Models like **Copilot** and **LLaMA** have limitations when it comes to analyzing deeply nested or context-sensitive logic. Direct inspection and testing are still necessary for understanding complex behaviors.

---

### 💡 **Conclusion:**

The event handling structure uses a combination of flags and switch-based logic for clarity and extensibility.

* **Move/Drag/Down events** are handled separately due to their complexity, requiring coordinate updates and flag management.
* **CDTJ (Coordinate Distance Threshold Judge)** ensures that only significant movements trigger updates.
* **UL/EFFOFF/MEL flags** enable flexible event handling and make the system easy to extend and maintain.

---

# Multi-Pointer Focus & Drag Handling — Current Status

## 1. Completed Changes

### Per-PSlot Focus Ownership
- When multiple `window_ui` instances exist, **focus is maintained per PSlot**
- Each PSlot can own **at most one focused `window_ui` instance**
- Multiple PSlots can simultaneously focus **different** `window_ui` instances
- Global focus dependency has been removed for drag interactions

### Multi-Touch Compatibility
- Focus routing and drag logic support **simultaneous multi-pointer input**
- Each pointer operates independently through its own PSlot
- Drag state, focus state, and movement deltas are isolated per slot

---

## 2. Interaction Invariants

- One pointer → one PSlot → one focused `window_ui`
- While `Down bit = 1`, the focused `window_ui` for that PSlot must not change
- Drag is treated as a **mode**, not an event
- Hover / tooltip logic is disabled while `Down bit = 1`
- Slot state is independent across all active pointers

---

## 3. Next Validation Step

### Multi-Touch Drag Test Scenario
- Instantiate approximately **five `window_ui` instances**
- Use **multi-touch input** to press and drag the **bar area** of different windows simultaneously
- Verify that multiple windows can be dragged **concurrently**, each by a different pointer

### Expected Behavior
- Each pointer drags only its own focused `window_ui`
- Releasing one pointer does not affect other active drags
- No focus switching occurs during drag
- No hover or tooltip events are triggered while dragging
- Slot cleanup occurs correctly on pointer release or cancel

---

## 4. Architectural Outcome

- Input handling is fully **slot-based and deterministic**
- Focus ownership is **decoupled from global state**
- The system supports scalable multi-pointer interaction without FSM duplication
- Behavior aligns with native OS and browser multi-touch interaction models

Absolutely! Here's a clear English summary of your work today based on all the code, logs, and discussions:

---

## **1️⃣ Goal**

* Implement **multi-drag** behavior on top of PSA (Pointer Slot Array) system, beyond what typical UI/UX libraries provide.
* Safely handle **pointer movement and leave/up events** to manage focus properly.
* Prevent duplicate focus using a **UID-based system**.

---

## **2️⃣ Core Concepts**

1. **UID-based Focus Management**

   * Pointer `id` changes frequently and is unreliable for comparison.
   * Use PSA `tuid`/`fuid` (#uid) to decide whether to maintain focus.

2. **Duplicate Focus Check (CDIOPSA)**

   * If the same `tuid`/`fuid` appears **2 or more times**, maintain focus.
   * If it appears **once**, allow blur on leave.

3. **Multi-pointer Event Handling**

   * Events flow: `pointerover` → `pointerenter` → `pointerdown` → `pointermove` → `pointerup` → `pointerleave`.
   * PSA status is maintained based on #uid, regardless of fluctuating pointer IDs.

4. **Safe Blur**

   * Leave events do not directly call blur.
   * Call `CDIOPSA` first to check for duplicate focus before executing blur.

5. **Abstraction Structure**

   * A JS abstract class compares instance states of original classes.
   * This allows immediate detection of whether a UI is input-capable.

---

## **3️⃣ Key Implemented Code**

1. **Check for Duplicate Focus**

```js
CDIOPSA(tuid, luid) {
    let psa = this.#psa;
    let cnt = 0;
    for (let i = 0; i < psa.length; i++) {
        if (tuid === psa[i].get_tuid() && luid === psa[i].get_fuid()) {
            cnt++;
        }
    }
    return cnt > 1; // maintain focus if 2 or more
}
```

2. **Leave Event Handling**

```js
switch(cat) {
    case 0: // pointer leave
        ps.set_effoff(true); // turn off hover and tooltip effects
        if(this.CDIOPSA(ps.get_tuid(), ps.get_fuid()) === false) {
            this.#blur(idx); // safely blur
        }
    break;
}
```

---

## **4️⃣ Log Analysis**

* Pointer `id` changes frequently, but using #uid ensures stable focus management.
* Leave/up events now safely maintain or blur focus according to PSA state.
* Repeated `pointermove` events do not break PSA logic.
* Current multi-drag logic appears **stable and correct**.

---

## **5️⃣ Next Steps**

1. Visualize PSA status — create a flowchart showing **per-pointer focus and hover states**.
2. Edge-case testing:

   * Simultaneous leave/up events and focus decisions
   * PSA slot initialization or removal safety
3. Optionally, further abstract blur/focus logic for clarity and maintainability.

---

# UI System Development Log & Design Notes

## Overview

This document summarizes the recent development progress, design decisions, and bug resolutions
related to the UI system, input handling, and rendering pipeline.

The issues encountered were not caused by conceptual flaws in the architecture, but by accidental
omission of previously required logic during refactoring and initialization cleanup.

At the current stage, the system structure is stable and extensible.

---

## 1. Core UI Class Hierarchy

### Focus-capable UI

- All UI elements that can receive focus inherit from:
  - `interactive_ui_`

### Draggable UI

- Draggable UI elements inherit from:
  - `manipulator_` (abstract class)

```js
class manipulator_ extends interactive_ui_ {
  #drag = true;
  set_drag(bool) { ... }
  get_drag() { return !!this.#drag; }
}
```

* Drag capability is explicitly controlled.
* Currently, drag is enabled only for specific instances (e.g. `bar_`).

### Non-resizable Interactive UI

* UI elements that support interaction but not resizing inherit from:

  * `interactive_ui_non_rs`

### Tooltip UI

```js
class tooltip_ extends interactive_ui_non_rs { ... }
```

* Tooltip logic is intentionally lightweight.
* Tooltip visibility depends solely on hover state.
* No focus or drag coupling.

---

## 2. Instance Type Detection (`isOInst`)

### Design

* Uses `switch` only (no `if`)
* Internally uses `instanceof`
* Maps string categories to class constructors

### Purpose

* Enables abstraction-level checks without coupling to concrete classes
* New UI types can be added by:

  * Declaring the class
  * Registering it in `isOInst`

This allows abstract logic to remain unchanged when new UI types are introduced.

---

## 3. UID System Design

### `system_.#uid_cnt`

* Starts from `0`
* Used as a **UID issuer**, not a strict UI count
* Always incremented after registration
* UID duplication is never allowed

### Important Clarification

* After UI deletion:

  * `#uid_cnt` no longer represents total UI count
* Actual number of managed UI instances:

  * `system_.#ui_list.length`

This separation is intentional.

---

## 4. UI Registration Flow (`system_.register`)

### Registration Scope

Currently, `register(ui)` explicitly handles `window_` instances and their hierarchy.

### Registration Order

1. Window
2. Bar
3. Bar buttons
4. Content area
5. Content children

Each step:

* Assigns a new UID
* Pushes into `#ui_list`
* Maintains parent–child relationships

### Rendering Dependency (Critical Fix)

* Rendering order is based on:

  * `system_.#pri_list`
* Window registration **must** update `#pri_list`

```js
this.#update_pri_list(tuid);
```

Failure to do this caused UI to exist logically but not render.

This omission was caused by over-aggressive block commenting during refactoring.

---

## 5. `top_ar` Structure

```txt
[
  [top_ui_uid_1, top_ui_uid_2, ...],
  [last_child_uid_1, last_child_uid_2, ...]
]
```

* Acts as a shortcut for top-level UI ranges
* Updated during window registration

---

## 6. Focus Management

### `#foc_list`

* Represents focus acquired via `down` events
* Used for:

  * Drag ownership
  * Keyboard input routing
* Pointer-based ownership model

### Explicit Rule

* Hover-related UI **must NOT** be stored in `#foc_list`

---

## 7. Hover & Tooltip Design Direction

### Hover

* Hover is a transient observation state
* If hover cannot be maintained, it should disappear immediately
* Only specific UI types are hover-capable
* These UI instances should be managed in a **separate hover list**

### Tooltip

* Tooltip visibility is driven by hover state only
* No focus or drag dependency
* Implemented with minimal state and low overhead

This is a refined version of an older (9-year-old) concept,
reimplemented to minimize runtime waste.

---

## 8. Drag System Status

* Multi-pointer input stabilized
* Multi-drag behavior stabilized
* Drag currently applies only to `bar_` instances
* Instance-based filtering is sufficient for control

---

## 9. Root Cause of Recent Issues

* Not a structural or architectural flaw
* Caused by:

  * Commenting out large blocks of existing logic
  * Rewriting initialization flow while visually scanning comments
* `pri_list` update logic was unintentionally omitted

This was a human error, not a system design problem.

---

## 10. Current System State

* Input system: stable
* Drag system: stable
* UID system: consistent
* Rendering pipeline: restored
* Hover / scroll: not yet implemented, but architecture-ready

The system is now in a state where new features can be layered on
without further structural rework.

---

# PCUI Engine – Development Log & Structural Notes

## Overview

This document summarizes the recent development work, debugging process, and architectural decisions made while stabilizing the PCUI engine, especially around `ui_` lifecycle, UID management, focus handling, and rendering order.

The engine is now structurally stable, with multi-drag fully operational and rendering functioning correctly. Remaining work mainly concerns hover, scroll, and fine-tuning focus logic under V8 optimization behavior.

---

## Core Design Principles

### 1. UID-Centric Architecture

- Every `ui_` instance receives a unique `#uid` issued by `system_.#uid_cnt`
- `#uid_cnt` starts from `0` and **always increments**, never reused
- UID serves two roles:
  - Identifier for hit-test, focus, and rendering logic
  - Monotonic issuer, *not* a reliable count of active UI instances

Important:
- `#ui_list.length` is treated as the actual number of active UI instances
- `#uid_cnt` is primarily an **ID issuer**, not a strict counter after deletions

---

### 2. Registration Pipeline (`system_.register`)

Registration order for a `window_` instance:

1. `window_`
2. `bar_`
3. `bar_` buttons
4. `contents_area_`
5. `contents_area_` contents

Each step:
- Assigns a fresh UID
- Pushes the instance into `system_.#ui_list`
- Maintains continuous UID ranges per top-level UI

Final bookkeeping:
- `system_.#top_ar[0]` stores top UI start UID
- `system_.#top_ar[1]` stores last descendant UID
- `system_.#uid_cnt` incremented once more at the end

---

### 3. Rendering Order (`pri_list`)

- Rendering is driven by `system_.#pri_list`
- Z-order is defined solely by `pri_list`
- A critical bug was caused by forgetting to update `pri_list` during refactoring

Fix:
```js
this.#update_pri_list(tuid);
````

This must be called immediately after registering a top-level `window_`.

---

## UI Class Hierarchy

### Base Rules

* All focusable UI inherits from `interactive_ui_`
* All draggable UI inherits from `manipulator_`
* Non-draggable interactive UI uses `interactive_ui_non_rs`

```js
class manipulator_ extends interactive_ui_ {
  #drag = true;
}
```

This allows drag capability to be determined by instance type rather than flags.

---

### window_

* Owns:

  * `#bar`
  * `#contents_area`
* Does **not** auto-register children into the system
* Child attachment and UID assignment are handled exclusively by `system_.register`

This separation fixed multiple initialization-order bugs.

---

### bar_

* First child of `window_`
* Drag handle for the window
* Owns button instances (`min`, `max`, `close`)
* Buttons are created first, registered later by the system

---

### contents_area_

* Non-draggable interactive UI
* Holds content UI via `set_contents`
* Content instances are registered and attached during system registration

---

## Focus Handling Strategy

### foc_list Design

* `foc_list` stores **UIDs only**, never object references
* Reason:

  * Prevent accidental mutation via DevTools
  * Avoid reference-based deoptimization
  * UID mismatch can safely fail with a false signal

This was a deliberate choice to trade convenience for stability and debuggability.

---

### Pointer Slots vs Focus

* Pointer slots manage active pointer state
* `foc_list` manages focus on pointer down
* Hover UI **must not** be stored in `foc_list`

Hover will be handled by a separate list.

---

## isOInst Utility

* Centralized instance checking via `instanceof`
* Uses string-based category mapping
* Avoids direct prototype checks scattered across code

Example:

```js
isOInst(obj, 'ui')
isOInst(obj, 'winui')
```

This enables consistent abstraction-level comparisons.

---

## V8 / DevTools Observations

### Private Fields

* JS private fields provide **language-level encapsulation**
* They do **not** prevent DevTools from:

  * Inspecting
  * Holding live references
  * Mutating internal state

Conclusion:

* Bugs observed were caused by **debugger interference**, not logic errors

---

### Map vs Array

* `Map` caused unexpected deoptimization even with frozen or constant data
* Deep private slots are often the first optimization targets to be dropped
* Arrays provide:

  * Predictable memory access
  * Easier debugging
  * Stable performance under DevTools inspection

Decision:

* All core runtime structures use private arrays instead of Map

---

## Multi-Drag Status

* Fully stabilized
* Drag logic applies only to `bar_` instances
* Instance-type checks are sufficient
* No special casing required

This significantly reduced complexity.

---

## Tooltip & Hover Plan

* `tooltip_` class already defined
* Registered via `isOInst` like other UI classes
* Hover UI will:

  * Be tracked in a separate list
  * Only render while hover state is maintained
  * Be discarded immediately when hover ends

This avoids unnecessary state retention.

---

## Undo / Restore Strategy

* Restored UI should receive **new UIDs**
* Old UID reuse is avoided to:

  * Preserve UID monotonicity
  * Prevent top_ar range corruption
  * Simplify focus and hit-test logic

---

## Current State

* Rendering: Stable
* Multi-drag: Stable
* UID issuance: Stable
* Registration pipeline: Stable
* Remaining work:

  * Hover list implementation
  * Scroll abstraction
  * Minor focus adjustments under V8 optimization behavior

---

## Final Note

Recent bugs were not structural failures, but the result of:

* Large refactors
* Block-commenting critical paths
* Temporarily forgetting `pri_list` integration

Once restored, the original architecture proved sound.

The engine is now at a level suitable for a baseline demo release once text/dynamic UI elements are finalized.

---

# PCUI Engine – Next Steps & Planned Work

## Purpose

This document outlines the remaining and upcoming work required to bring the PCUI engine from a stable internal prototype to a solid demo-ready state.

The core architecture is now stable. The remaining tasks focus on interaction completeness, robustness under V8 optimization, and developer-facing usability.

---

## 1. Focus System Refinement

### Goals
- Stabilize focus behavior under V8 optimization
- Prevent reference-based deoptimization
- Maintain deterministic focus transitions

### Planned Work
- Refine `foc_list` handling logic
- Ensure focus release always occurs on:
  - pointer up
  - pointer cancel
  - pointer slot invalidation
- Enforce **UID-only storage** in `foc_list`
- Add defensive validation:
  - UID range check
  - `top_ar` boundary verification before hit-test

### Notes
- Focus logic must remain independent from hover logic
- No object references stored to avoid DevTools mutation risks

---

## 2. Hover System Design & Implementation

### Goals
- Introduce hover interactions without polluting focus logic
- Avoid persistent state when hover is not maintained

### Planned Work
- Define a dedicated hover-capable UI category
- Introduce a separate hover list (e.g. `hover_list`)
- Hover rules:
  - Hover exists only while pointer remains inside hit area
  - No persistence across pointer slots
  - No interaction with `foc_list`

### Tooltip Integration
- Use existing `tooltip_` class
- Tooltips:
  - Created on hover enter
  - Destroyed immediately on hover leave
- No UID reuse for tooltips

---

## 3. Scroll Interaction Abstraction

### Goals
- Support scrollable UI without breaking drag or focus
- Keep scroll behavior composable and optional

### Planned Work
- Define scroll-capable UI interface
- Separate scroll handling from pointer drag
- Establish priority rules:
  - Scroll > Hover
  - Drag > Scroll (when applicable)
- Support wheel-based input first
- Defer touch-scroll until core logic is proven stable

---

## 4. Text & Editable UI Finalization

### Goals
- Enable full demo-level text interaction
- Ensure IME integration remains stable

### Planned Work
- Finalize `editable_ui_` behavior
- Ensure:
  - Text state is registered via `reg_ui_text`
  - Undo/redo integrates with text state
- Validate IME input flow across:
  - Focus changes
  - Drag interruptions
  - UI deletion / restoration

---

## 5. Undo / Redo System Integration

### Goals
- Restore UI state safely without UID conflicts
- Preserve system consistency

### Planned Work
- Always issue **new UIDs** on restore
- Rebuild:
  - `ui_list`
  - `top_ar`
  - `pri_list`
- Restore logical state, not identity
- Ensure restored UI passes through full `register` pipeline

---

## 6. Rendering & Performance Validation

### Goals
- Maintain predictable performance under DevTools inspection
- Prevent accidental V8 deoptimization

### Planned Work
- Validate hot paths:
  - hit-test
  - focus resolution
  - rendering loop
- Ensure arrays remain monomorphic where possible
- Avoid Map / Set in runtime-critical paths
- Confirm private fields do not leak references into render loop

---

## 7. Developer Debug Safety

### Goals
- Reduce accidental corruption via DevTools
- Make misuse obvious and noisy

### Planned Work
- Harden public getters:
  - Return copies instead of references where possible
- Add optional debug-only assertions:
  - UID mismatch warnings
  - orphaned UI detection
- Keep mutation paths explicit and intentional

---

## 8. Demo Readiness Checklist

### Required Before Demo Release
- Stable multi-drag (DONE)
- Stable rendering order (DONE)
- Focus + hover separation
- Basic scroll support
- Text input via IME
- Tooltip demonstration
- No console errors under stress interaction

---

## Closing Note

The engine’s core abstraction is complete.

Remaining work is **not architectural**, but behavioral refinement:
- interaction polish
- state isolation
- runtime resilience

Once hover, scroll, and text editing are finalized, the engine will be suitable for a public demo without structural compromise.


---

# 최근 몇 주 동안 작업한 내용 / 정립된 내용 / 정리한 내용 끝

---

# IME Engine Developer Guide and AI Reference Document START

## 1. Overview and Design Principles

The ime\_ class is a high-performance IME (Input Method Editor) engine
for web environments. It is designed to support Korean (Dubeolsik),
Vietnamese (Telex), and English input.

**Core Design Philosophy:** - **Performance Optimization:** Avoids
unnecessary loops and the sequential search of if/else if chains,
utilizing switch statements and bitmasking to achieve fast branching and
real-time response speeds. - **Flexible Extensibility:**
Language-specific rules are separated into the #rule map, allowing easy
addition of rules and logic for new languages (e.g., Spanish). - **Clear
Flag System:** Complex input scenarios are defined using boolean flags
such as KOSxx and PVSxx to control the processing logic.

## 2. Core Architecture and Data Structures

The current state of the IME is managed by the following variables:

-   **#linow:** The currently active language code (e.g., 'en', 'ko',
    'vn').
-   **#rule:** The rule data object for the current language (ime\_.KO
    or ime\_.VN).
-   **#c\_, #v\_, #c2:** Characters currently being composed
    (first/middle/final consonant or vowel).
-   **#imebm:** The bitmask state of currently pressed modifier keys
    (Shift, Ctrl, Alt).
-   **#commit:** Finalized, committed string.
-   **#preedit:** Temporary string being composed (for screen display).

## 3. Core Method Analysis and Scenario-Specific Operation

### A. public_input(iarr): The Master Input Controller

Processes all user key inputs and branches immediately based on the
input type.

  -----------------------------------------------------------------------
  User Scenario           Related Flags           Method Result
  ----------------------- ----------------------- -----------------------
  Spacebar input          SPCORSPF                Finalizes current
                                                  character, adds space,
                                                  resets.

  BackSpace               SPCORSPF                Calls #rb_composition()
                                                  to revert one step.

  'a' in English          ENINPUT                 Immediate commit.

  'r' (ㄱ) in Korean      KOINPUT, KOS03          Sets #c\_ to ㄱ and
                                                  continues composition
                                                  logic.
  -----------------------------------------------------------------------

### B. #composition(): The Composing Character Generator

Returns a completed character based on the current state.

### C. #rb_composition(): The Backspace Reversion Engine

Step-by-step reversion of composition according to language rules.

### D. mix\_ and Indexing Utilities

mix\_ uses multiple flags (RUN\~RUN5) to determine composition success.
Index helpers (#indexs, #indexp, #index\_) minimize loops and speed up
map searches.

## 4. Suggestions for AI Analysis

-   Performance bottleneck analysis for KOSxx branches.
-   Missing exception logic in composition or separation.
-   New language integration (e.g., Spanish additions to #rule and
    public_input logic).

# ime\_ Class Public Method Analysis

## 1. Overview

Public functions interact with external systems, handling
initialization, key verification, and state/control outputs.

## 2. Public Methods Summary

### A. Initialization and State Management

  ----------------------------------------------------------------------------
  Function          Description         Input       Output      Scenario
  ----------------- ------------------- ----------- ----------- --------------
  constructor       Initializes IME     langlist    ime\_       Called at
                    instance                        instance    startup

  load_ime          Loads language      lang        rule object Internally
                    rules                                       used

  get_ilnow         Returns current     \-          string      For UI status
                    language                                    display

  get_isr/set_isr   IME processing      bool        bool        To check or
                    status                                      force IME
                                                                enabled

  get_rbc           Returns             \-          RegExp      For commit
                    control-char                                filtering
                    removal regex                               
  ----------------------------------------------------------------------------

### B. Key Input Verification Utilities

  Function     Description
  ------------ -----------------------------------------
  is_spc(kc)   Is special character / F-key
  is_spf(kc)   Is function key (Backspace, Enter etc.)
  is_eng(kc)   Is English alphabet key
  shift\_()    Checks Shift modifier

### C. Event Handlers

  Function        Description
  --------------- ----------------------------------------------
  kip(e)          KeyDown handler (calls catch + public_input)
  krp(e)          KeyUp handler (calls release)
  catch(iarr)     Tracks pressed key + updates bitmask
  release(iarr)   Removes key + clears bitmask entry

### D. Composition and Utility Retrieval

  Function            Description
  ------------------- --------------------------------------
  get_commit()        Returns finalized string
  get_preedit()       Returns composing string
  mix_vowel(c)        Attempts vowel composition
  mix_csnt2(c)        Attempts final-consonant composition
  is_mix_str(c,cat)   Decomposes combined vowel/consonant
  bs_del(idx)         Deletes char in commit buffer

## 3. Usage Scenarios

### Scenario 1: Web Application Event Binding

``` javascript
const ime = new ime_('en,ko,vn', systemObject);
document.addEventListener('keydown', (e) => ime.kip(e));
document.addEventListener('keyup', (e) => ime.krp(e));
```

### Scenario 2: Updating UI

``` javascript
const committed = ime.get_commit();
const preedit = ime.get_preedit();
```

# public_input Detailed Analysis

### 1. Input Flag Calculation

Calculated per event:

-   EN, KO, VN
-   SPCORSPF
-   ENINPUT
-   KOINPUT
-   PUBINPUT

### 2. Control Flow

#### Stage 1: Special Key Handling

-   Symbols finalize composition + append char.
-   Backspace -\> #rb_composition()
-   Language toggles update bitmask + language.

#### Stage 2: English Input

-   ENINPUT → commit immediately.

#### Stage 3: Korean/Vietnamese Logic

Korean: Uses 25+ KOS flags to validate composition transitions.\
Vietnamese: Tone/consonant/vowel combination handled via mix\_.

Finally:

``` js
this.#set_preedit(this.#composition());
```

---

# IME Engine Developer Guide and AI Reference Document END

---

# ime_ Class In-depth Analysis: IME Engine Developer Guide and AI Reference Document

---

1. Overview and Design Principles

The ime_ class is a high-performance IME (Input Method Editor) engine for web environments. It is designed to support Korean (Dubeolsik), Vietnamese (Telex), and English input.

Core Design Philosophy:

Performance Optimization: Avoids unnecessary loops and the sequential search of if/else if chains, utilizing switch statements and bitmasking to achieve fast branching and real-time response speeds.

Flexible Extensibility:

Language-specific rules are separated into the #rule map, allowing easy addition of rules and logic for new languages (e.g., Spanish).

Clear Flag System:

Complex input scenarios are defined using boolean flags such as KOSxx and PVSxx to control the processing logic.

---

2. Core Architecture and Data Structures

The current state of the IME is managed by the following variables:
#linow: The currently active language code (e.g., 'en', 'ko', 'vn').

#rule:The rule data object for the current language (ime_.KO or ime_.VN).

#c_, #v_, #c2: The characters currently being composed (first/middle/final consonant, vowel).

#imebm: The bitmask state of currently pressed modifier keys (Shift, Ctrl, Alt).

#commit: The finalized, committed string.

#preedit: The temporary string being composed (for display on screen).

---

3. Core Method Analysis and Scenario-Specific Operation

To assist AI analysis, this section connects major methods with real user input scenarios.

---

A. public_input(iarr): The Master Input Controller

This is the main entry point for processing all user key inputs (iarr: [keyCode, location, key string]). public_input branches immediately based on the input type.

---

Scenario Examples and Logic Flow:

User Input Scenario Related Flags   Called Method and Result
Spacebar input  SPCORSPF    Calls #add_char(#composition() + ' '). Finalizes current character, adds space, resets.

BackSpace input SPCORSPF    Calls #rb_composition(). Reverts the character currently being composed by one step.

'a' input in English mode   ENINPUT #set_commit_preedit('a', ''). Committed immediately.

'r' (ㄱ) input in Korean mode    KOINPUT, KOS03  Sets #c_ = 'ㄱ'. Proceeds to the next logic step to start composition.

---

B. #composition(): The Composing Character Generator

This function returns a single completed character based on the current state (#c_, #v_, #c2).

Scenario Examples and Logic Flow:

Current IME State   Related Flags   Logic Flow  Returned Result (Example)

Korean, #c_='ㅎ', #v_='ㅏ'    KO, VFI, VSI    Calculates the Korean Unicode formula (0xac00 + ...).   '하'

Korean, #c_='ㅎ', #v_='ㅏ', #c2='ㄴ'   KO, VFI, VSI, VTI   Formula adds the final consonant index. '한'

Vietnamese, #v_='á' VN, VV  Returns the #v_ value as is (Telex method). 'á'

---

C. #rb_composition(): The Backspace Reversion Engine

On backspace input, this function reverts the composition state step-by-step according to language rules.

Scenario Examples and Logic Flow:

User Input  Previous IME State  Related Flags   Logic Flow  New IME State (Example)

BackSpace   KO, #c2='ㄴ' ('한')   KO, RMVC2   Final consonant removal logic executes. #c2='' ('하')

BackSpace   KO, #v_='ㅘ' ('와')   KO, RMVVO   Double vowel separation logic executes. #v_='ㅗ' (오')

BackSpace   VN, #v_='á' PUBLIC, T_  Tone removal logic executes.    #v_='a'

---

D. mix_ and Indexing Utilities

These functions act as the engine for confirming composition possibilities and actually composing/separating characters.

mix_ uses 5 internal flags (RUN~RUN5) to determine composition success.

#indexs, #indexp, #index_ minimize unnecessary loops, rapidly indexing where a specific character belongs within the composition maps.

---

4. Suggestions for AI Analysis

The AI can use the detailed structure and scenarios above to provide in-depth analysis on the following areas:

Performance Bottleneck Analysis: Analyze if certain KOSxx scenarios within public_input are more computationally expensive than others.

Exception Handling Verification: Identify if any composition/separation scenarios are missing from the current KOSxx, PVSxx flag definitions.

New Language Integration Advice: Suggest specific #rule data structures and necessary switch cases within public_input's PUBINPUT logic for adding Spanish IME support.

---

ime_ Class Public Method Analysis

---

1. Overview

The public function area of the ime_ class is primarily used for interaction with external systems (such as application UI controllers, event listeners, etc.).

These functions handle status checks, initialization, and processing specific types of key inputs.

---

2. Public Methods Detailed Summary

---

A. Initialization and State Management

Function Name   Description Input (Input)   Output (Output) Usage Scenario

constructor Initializes the IME instance.   lang_set (language list), sobj (system object)  ime_ instance   Called once when the IME system starts up to load language rules and perform basic setup.

load_ime(lang)  Dynamically loads language-specific rules.  lang (language code)    Object (rule map)   Used internally to retrieve detailed rule data for a specific language.

get_ilnow() Returns the current language code.  N/A string (e.g., 'ko') Used to display the active IME language in a UI status bar.

get_isr(), set_isr(bool)    Manages the IME processing status flag. bool (boolean)  true/false  Used to check if the IME is currently active and processing input, or to force a status change.

get_rbc()   Returns the control character removal regex.    N/A RegExp object   Used for filtering invisible characters before the final committed string is output.

---

B. Key Input Verification Utilities

These functions rapidly identify what type of key a specific key code corresponds to.

Function Name   Description Input (Input)   Output (Output) Usage Scenario

is_spc(kc)  Checks if it's a special character/F-key.   kc (keyCode)    true/false  Used in public_input to quickly determine if the input is a special character rather than a normal letter.

is_spf(kc)  Checks if it's a special function key.  kc (keyCode)    true/false  Used to identify keys like Backspace, Enter, Spacebar that interrupt the IME composition flow.

is_eng(kc)  Checks if it's an English alphabet key. kc (keyCode)    true/false  Used to determine if the input is English or a key intended for IME composition.

shift_()    Checks the Shift key press status.  N/A true/false  Used in Korean input to determine uppercase/lowercase key mapping or check modifier keys for IME mode switching.

---

C. Event Handlers

These functions interface directly with external event listeners.

Function Name   Description Input (Input)   Output (Output) Usage Scenario

kip(e)  Initiates KeyDown event processing. e (Event object)    N/A The function bound to the web application's keydown event listener. Calls catch and public_input.

krp(e)  Initiates KeyUp event processing.   e (Event object)    N/A The function bound to the web application's keyup event listener. Calls release.

catch(iarr) Tracks KeyDown status.  iarr (key info array)   N/A Records the pressed key in #keep and updates the #imebm bitmask.

release(iarr)   Releases KeyUp status tracking. iarr (key info array)   N/A Removes the key from #keep and clears the corresponding bit in the #imebm bitmask.

---

D. Composition Result Retrieval and Utilities

Function Name   Description Input (Input)   Output (Output) Usage Scenario

get_commit()    Returns the final committed string. N/A string  Used to retrieve the finalized string for output to the UI text area after IME processing.

get_preedit()   Returns the preedit string. N/A string  Used to retrieve the temporary composed string for display in the UI overlay area.

mix_vowel(char) Attempts vowel composition. char (input char)   string or false Calls #mix_ to attempt vowel combination (e.g., 'ㅗ'+'ㅏ'='ㅘ').

mix_csnt2(char) Attempts final consonant composition.   char (input char)   string or false Calls #mix_ to attempt double final consonant combination (e.g., 'ㄺ').

is_mix_str(c, cat)  Returns decomposition info for a composed char. c(char), cat(category)  Object or false Used during backspace processing to get index info needed to separate double consonants/vowels.

bs_del(dsi) Deletes a character at a specific index.    dsi (delete index)  string (string after deletion)  Used when backspace is input to remove a character from the commit buffer at a specific position.

---

3. Public Method Usage Scenarios (Examples)

---

Scenario 1: Web Application Event Binding

The application creates an ime_ instance and binds kip and krp to event listeners.

```javascript
const ime = new ime_('en,ko,vn', systemObject); // Create IME instance
// Bind event listeners
document.addEventListener('keydown', (e) => ime.kip(e));
document.addEventListener('keyup', (e) => ime.krp(e));
```

---

Scenario 2: UI Text Field Updates

The internal state changes whenever public_input is called. The application periodically calls get_commit() and get_preedit() to update the display.

```javascript
// Update function called every frame or after input event
function updateUI() {
    const committedText = ime.get_commit();
    const preeditText = ime.get_preedit();

    if (committedText.length > 0) {
        // If committed text exists, add to the actual text field and clear ime.#commit
        console.log("COMMIT:", committedText);
        // ... actual UI update logic ...
    }
    if (preeditText.length > 0) {
        // If composing text exists, display in the overlay area
        console.log("PREEDIT:", preeditText);
        // ... actual preedit UI update logic ...
    }
}
```

Detailed Analysis of the public_input(iarr) Function

public_input serves as the master controller for the IME system. It receives all user key input events (iarr) and determines the current language mode and the type of key input, branching immediately to the appropriate internal logic.

Performance Consideration: Various flags are calculated at the start of the function, and switch statements are used to explore scenarios efficiently.

---

1. Input and Initial Flags Setting (Input and Initial Flags)

The function receives iarr([keyCode, location, key string]) and calculates the following core flags:

````
EN: Current language = 'en' (English)

KO: Current language = 'ko' (Korean)

VN: Current language = 'vn' (Vietnamese)

SPCORSPF: Is the input key a special character or function key? (e.g., Space, Enter, . etc.)

ENINPUT: Was an English alphabet key pressed in English mode? (No composition needed, committed immediately)

KOINPUT: Was an English alphabet key pressed in Korean mode? (Starts Korean composition)

PUBINPUT: Was input made in a compositional language mode that is not English? (Vietnamese, Spanish, etc.)
````

---

2. Control Flow and Scenario-Specific Operation

public_input is structured into three main stages using switch statements.

---

A. Stage 1: Special Key Input Handling (switch(SPCORSPF))

This handles keys that interrupt the composition flow or are used for system control.

Scenario    Example Input Key   Behavior    Related Helper Functions

End Composition and Add Symbol  0-9, ., ,, ;    Finalizes current composition (calling #composition()), adds the symbol (calling #add_char()), resets IME state.    #composition(), #add_char()

IME Control/Language Switch Shift, Ctrl, Space, Han/Eng Key Updates the bitmask (#imebm), detects language switch (calling #change_linow()).    #set_bm(), #change_linow()

Editing Control BackSpace, Enter, Tab   BackSpace calls reversion logic (calling #rb_composition()), others finalize composition and add control character. #rb_composition(), #composition()

Navigation/Function Keys    F1-F12, Home, Arrow Keys    break without IME state change. OS/browser default action performs. N/A

---

B. Stage 2: English Input Handling (switch(ENINPUT))


If ENINPUT is true, English alphabet inputs are committed immediately without composition.

Scenario    Example Input Key   Behavior    Related Helper Functions

English Alphabet Input  'a', 'B'    Immediately commits the key to #commit and clears #preedit. #set_commit_preedit()

---

C. Stage 3: Korean/Vietnamese Input Handling (switch(S01 && RUN3))
This stage is entered if an English alphabet key is pressed while in an IME mode (i.e., using English keys to input Korean/Vietnamese).

---

1) Korean Input (case KOINPUT)

Handles all possible scenarios using 25+ KOSxx flags.

Scenario    Example Input ('r'='ㄱ', 'k'='ㅏ')    Related Flags   Behavior

Initial Consonant Input r(ㄱ)    KOS03   Sets #c_ to 'ㄱ'.

Vowel Input r(ㄱ) k(ㅏ)   KOS11   Sets #v_ to 'ㅏ' (composing '가').

Final Consonant Input   r(ㄱ) k(ㅏ) f(ㄴ)  KOS15   Sets #c2 to 'ㄴ' (composing '간').

Double Final Consonant  r(ㄱ) k(ㅏ) f(ㄴ) t(ㅈ) KOS22, KOS24    Calls mix_csnt2() to compose 'ㄵ'. Updates #c2 (composing '앉').

Vowel after Final Consonant (Split) r k f(한) k(ㅏ)   KOS18, KOS19    Finalizes '한' as '하', moves 'ㄴ' to next char initial consonant (starts composing '하나').

---

2) Vietnamese Input (case PUBINPUT within case VN)

Updates the state based on consonant/vowel/tone input.

Scenario    Example Input   Related Flags   Behavior

Consonant Input (d -> đ)    'd' typed twice C_, VN, VNCd    Converts 'd' to Vietnamese 'đ'.

Tone Input  'a' then 's'    TO, PTS01   Calls mix_ to combine 'a' and 's' -> 'á'. Updates #v_.

---

3. Function Conclusion
After all branching logic is complete, the following code is executed to update the preedit text displayed on screen:
javascript
this.#set_preedit(this.#composition());

---

# ime_ Class In-depth Analysis: IME Engine Developer Guide and AI Reference Document END

---


# PCUI Engine – Next Steps & Planned Work

## Purpose

This document outlines the remaining and upcoming work required to bring the PCUI engine from a stable internal prototype to a solid demo-ready state.

The core architecture is now stable. The remaining tasks focus on interaction completeness, robustness under V8 optimization, and developer-facing usability.

---

## 1. Focus System Refinement

### Goals
- Stabilize focus behavior under V8 optimization
- Prevent reference-based deoptimization
- Maintain deterministic focus transitions

### Planned Work
- Refine `foc_list` handling logic
- Ensure focus release always occurs on:
  - pointer up
  - pointer cancel
  - pointer slot invalidation
- Enforce **UID-only storage** in `foc_list`
- Add defensive validation:
  - UID range check
  - `top_ar` boundary verification before hit-test

### Notes
- Focus logic must remain independent from hover logic
- No object references stored to avoid DevTools mutation risks

---

## 2. Hover System Design & Implementation

### Goals
- Introduce hover interactions without polluting focus logic
- Avoid persistent state when hover is not maintained

### Planned Work
- Define a dedicated hover-capable UI category
- Introduce a separate hover list (e.g. `hover_list`)
- Hover rules:
  - Hover exists only while pointer remains inside hit area
  - No persistence across pointer slots
  - No interaction with `foc_list`

### Tooltip Integration
- Use existing `tooltip_` class
- Tooltips:
  - Created on hover enter
  - Destroyed immediately on hover leave
- No UID reuse for tooltips

---

## 3. Scroll Interaction Abstraction

### Goals
- Support scrollable UI without breaking drag or focus
- Keep scroll behavior composable and optional

### Planned Work
- Define scroll-capable UI interface
- Separate scroll handling from pointer drag
- Establish priority rules:
  - Scroll > Hover
  - Drag > Scroll (when applicable)
- Support wheel-based input first
- Defer touch-scroll until core logic is proven stable

---

## 4. Text & Editable UI Finalization

### Goals
- Enable full demo-level text interaction
- Ensure IME integration remains stable

### Planned Work
- Finalize `editable_ui_` behavior
- Ensure:
  - Text state is registered via `reg_ui_text`
  - Undo/redo integrates with text state
- Validate IME input flow across:
  - Focus changes
  - Drag interruptions
  - UI deletion / restoration

---

## 5. Undo / Redo System Integration

### Goals
- Restore UI state safely without UID conflicts
- Preserve system consistency

### Planned Work
- Always issue **new UIDs** on restore
- Rebuild:
  - `ui_list`
  - `top_ar`
  - `pri_list`
- Restore logical state, not identity
- Ensure restored UI passes through full `register` pipeline

---

## 6. Rendering & Performance Validation

### Goals
- Maintain predictable performance under DevTools inspection
- Prevent accidental V8 deoptimization

### Planned Work
- Validate hot paths:
  - hit-test
  - focus resolution
  - rendering loop
- Ensure arrays remain monomorphic where possible
- Avoid Map / Set in runtime-critical paths
- Confirm private fields do not leak references into render loop

---

## 7. Developer Debug Safety

### Goals
- Reduce accidental corruption via DevTools
- Make misuse obvious and noisy

### Planned Work
- Harden public getters:
  - Return copies instead of references where possible
- Add optional debug-only assertions:
  - UID mismatch warnings
  - orphaned UI detection
- Keep mutation paths explicit and intentional

---

## 8. Demo Readiness Checklist

### Required Before Demo Release
- Stable multi-drag (DONE)
- Stable rendering order (DONE)
- Focus + hover separation
- Basic scroll support
- Text input via IME
- Tooltip demonstration
- No console errors under stress interaction

---

## Closing Note

The engine’s core abstraction is complete.

Remaining work is **not architectural**, but behavioral refinement:
- interaction polish
- state isolation
- runtime resilience

Once hover, scroll, and text editing are finalized, the engine will be suitable for a public demo without structural compromise.

---

# PCUI / IME Development Summary (Dec 2025)

## Overview

This document summarizes the recent development and stabilization work on the **PCUI system** and its supporting **IME architecture**, focusing on multi-pointer input handling, drag/move processing, rendering strategy decisions, and platform behavior (PC vs mobile).

The core philosophy is **DOM-free UI**, deterministic input handling, and explicit control over performance characteristics under modern JS engines (V8).

---

## Architectural Direction

### 1. DOM-Free UI as a First-Class Constraint

* The system is designed to operate entirely on **Canvas**, without relying on DOM-based text input or layout.
* This constraint directly impacts IME design: cursor movement, selection, editing, clipboard, undo/redo must all be implemented at the UI-system level.
* IME is therefore *dependent on a functional text-capable UI*, not the other way around.

**Conclusion:** UI system correctness and stability must precede full IME implementation.

---

## Input System Design

### 2. Pointer Slot Array (PSA)

* All pointer/mouse/touch inputs are normalized into a fixed-size **Pointer Slot Array (PSA)**.
* Each slot contains a `ps` instance or `null`.
* Slots may temporarily become `null` during pointer lifecycle transitions, but are immediately reused.

Key properties:

* Slot reuse is handled via `indexOf(null)`.
* PSA length is constant (`system_.PSL`).
* No dynamic resizing during runtime.

---

### 3. Focus Handling Strategy

* `hit_test` and focus resolution occur **only on down events**.
* Focus list (`foc_list`) is:

  * Created on `down`
  * Maintained during `move / drag`
  * Cleared on `up`

This avoids repeated hit testing during move phases and guarantees deterministic focus ownership.

---

## Drag / Move Processing

### 4. Drag Inheritance Model

* All UI classes inheriting from `manipulator_` implicitly support drag via a shared `#drag = true` flag.
* This enables uniform drag behavior across UI components without per-class reimplementation.

---

### 5. Multi-Pointer Stability Findings

Observed behavior during mobile testing:

* 2 simultaneous drags: stable
* 3 simultaneous drags: rare glitches
* 4+ simultaneous drags: frequent freezes (initially)

**Root cause:**

* Dirty-rectangle calculations were still being performed even though the renderer had switched to full-screen redraw.

**Fix:**

* Disabled dirty-rect calculation when full redraw is active.
* Result: no freezes even with 4+ touch points.

---

## Rendering Strategy

### 6. Dirty Rectangle Reevaluation

* Dirty-rect rendering was originally implemented to optimize redraw regions.
* In practice, under multi-pointer stress on mobile, dirty-rect calculation became more expensive than full redraw.

**Decision:**

* Prefer **full-screen redraw** by default.
* Keep dirty-rect logic available but disabled unless explicitly needed.

This aligns with real-world mobile GPU behavior and simplifies correctness.

---

## Event Processing Order

### 7. Update Loop (rAF-Synchronized)

The system update runs inside `requestAnimationFrame`:

1. Internal message resolution (`#MRQ`)
2. Global input lock reset
3. Rect adjustment / deferred rect updates
4. Pointer state updates (`UPSAA` or `DMEHP`, order adjusted during fixes)
5. Drag / Move Event Handling Process (DMEHP)
6. Rendering (full redraw)

Multiple orderings were tested; the current order avoids drag discontinuities.

---

## PSA Traversal Correction

### 8. `FUIDSIPSA` Simplification

Earlier versions attempted to early-exit PSA traversal when encountering `null` slots.
This caused intermittent drag interruption due to transient nulls.

**Final decision:**

* Always traverse the full PSA length.
* Collect valid `ps` entries by predicate only.

This trades negligible iteration cost for correctness and stability.

---

## Platform Behavior Notes

### 9. Mobile Touch Merging

* On mobile, touch points that are physically too close may be merged into a single pointer by the OS/browser.
* Once the points move outside the merge radius, multi-drag resumes normally.

This behavior is platform-level and not treated as a bug in PCUI.

---

### 10. Leave / Cancel Event Handling

* On mobile, `leave`-type events may be dropped.
* To ensure cross-browser consistency, PC behavior was aligned with mobile semantics.

**Result:** Unified behavior across PC and mobile.

---

## IME Development Status

### 11. Language Scope

* Current IME logic supports alphabet-based languages with diacritics via rule sets.
* Shared logic already covers:

  * Vowel-based diacritics
  * Vietnamese (except special `d` handling)

Consonant-diacritic cases are considered solvable by extending existing logic.

---

### 12. Implementation Order Decision

Despite IME being conceptually simpler than the full UI system:

* IME correctness depends on robust text UI primitives.

**Chosen order:**

1. Stabilize UI system
2. Implement PC-based text input/editing
3. Add virtual keyboard for mobile as a layer on top

---

## Engine-Level Considerations

### 13. V8 / Hidden Class Awareness

* Recent debugging revealed hidden-class instability caused by frequent shape changes in UI instances.
* System-level comparisons and instance checks were audited to minimize shape divergence.

The architecture assumes future V8 behavior changes and favors explicit, predictable object layouts.

---

## Current Status

* Multi-drag freeze issues resolved
* PSA traversal stabilized
* Rendering strategy simplified
* Cross-platform input behavior unified

**Conclusion:**
The project has reached a stable point where development can safely proceed to **text input editor implementation on PC**, with IME logic layered afterward.

---

*End of summary.*

---