본 문서의 목적은 새로운 구조를 제안하거나 설계를 재구성하는 데 있지 않다. 이미 확정된 메모리 모델, 인덱스 배치, 불변 규칙을 변경 없이 유지한 상태에서, **메모리 영역을 먼저 정리하고 그 위에 필요한 명세를 절차적으로 정렬**하는 데에만 있다.

특히 다음 원칙을 전제로 한다.

- System / Core 레지스터 영역(0\~127)은 완결된 설계이며 재해석·재배치·의미 확장은 허용되지 않는다.
- UI instance pool, UI data sector, Text, Cache, IME는 이미 정의된 경계와 의존 방향을 따른다.
- 오류 교정용문서는 참고 자료가 아니라 **구속력을 가지는 기준 문서**로 취급한다.
- 본 문서는 설명서가 아니라 명세 정리본이며, 이해를 돕기 위한 장식적 서술은 포함하지 않는다.

이 문서의 이후 모든 내용은 위 전제를 벗어나지 않는 범위에서만 추가·보완된다.

---

## PCUI System / Core Register Map (Index 0 \~ 127)

기본 단위: 1 Slot = Uint32 (4 bytes)\
총 크기: 128 Slots = 512 bytes\
설계 성격: 레지스터 파일 (구조 아님)

### 0 \~ 15 : Core Result / Pointer / Focus

| Index | Field        | Type   | Description           | Hot/Warm/Cold |
| ----- | ------------ | ------ | --------------------- | ------------- |
| 0     | DR\_MIN\_X   | Uint32 | Dirty Rect 최소 X       | Hot           |
| 1     | DR\_MIN\_Y   | Uint32 | Dirty Rect 최소 Y       | Hot           |
| 2     | DR\_MAX\_X   | Uint32 | Dirty Rect 최대 X       | Hot           |
| 3     | DR\_MAX\_Y   | Uint32 | Dirty Rect 최대 Y       | Hot           |
| 4     | ABS\_MIN\_X  | Uint32 | 절대 좌표 최소 X            | Hot           |
| 5     | ABS\_MIN\_Y  | Uint32 | 절대 좌표 최소 Y            | Hot           |
| 6     | ABS\_MAX\_X  | Uint32 | 절대 좌표 최대 X            | Hot           |
| 7     | ROOT\_IDX    | Uint32 | 시스템 루트 UI 인덱스 (고정값 1) | Hot           |
| 8     | HIT\_ID      | Uint32 | Hit-Test 결과 UI idx    | Hot           |
| 9     | HIT\_FLAGS   | Uint32 | Hit-Test 결과 플래그       | Hot           |
| 10    | FOCUS\_IDX   | Uint32 | 포커스 UI idx            | Hot           |
| 11    | CAPTURE\_IDX | Uint32 | Pointer Capture 대상    | Hot           |
| 12    | HOVER\_IDX   | Uint32 | Hover 대상 UI           | Hot           |
| 13    | ACTIVE\_PTR  | Uint32 | 활성 포인터 ID             | Hot           |
| 14    | ACTIVE\_BTN  | Uint32 | 활성 버튼 비트              | Hot           |
| 15    | SYS\_FLAGS   | Uint32 | 시스템 전역 상태 비트          | Hot           |

### 16 \~ 29 : Argument Registers

| Index    | Field             | Type   | Description    | Hot/Warm/Cold |
| -------- | ----------------- | ------ | -------------- | ------------- |
| 16 \~ 29 | ARG\_0 \~ ARG\_13 | Uint32 | 매니저 호출 인자 레지스터 | Hot           |

### 30 \~ 44 : Call / Return

| Index    | Field             | Type   | Description | Hot/Warm/Cold |
| -------- | ----------------- | ------ | ----------- | ------------- |
| 30       | CALL\_ID          | Uint32 | 호출 Opcode   | Hot           |
| 31 \~ 44 | RET\_0 \~ RET\_13 | Uint32 | 반환 레지스터     | Hot           |

### 45 \~ 95 : Scratch Pad / Temporary

| Index    | Field             | Type   | Description | Hot/Warm/Cold |
| -------- | ----------------- | ------ | ----------- | ------------- |
| 45 \~ 59 | SCRATCH\_EXT      | Uint32 | 확장 반환/연산 보조 | Warm          |
| 60 \~ 79 | TMP\_VAL\_0 \~ 19 | Uint32 | 임시 수치 연산    | Warm          |
| 80 \~ 89 | TMP\_BIT\_0 \~ 9  | Uint32 | 임시 조건 비트    | Warm          |
| 90 \~ 95 | TEMP\_EXT         | Uint32 | 추가 계산 워크    | Warm          |

### 96 \~ 111 : Path Stack

| Index     | Field      | Type   | Description | Hot/Warm/Cold |
| --------- | ---------- | ------ | ----------- | ------------- |
| 96        | STACK\_PTR | Uint32 | 경로 스택 포인터   | Warm          |
| 97 \~ 111 | PATH\_NODE | Uint32 | 트리 순회 경로    | Warm          |

### 112 \~ 127 : Memory Worker

| Index      | Field       | Type   | Description   | Hot/Warm/Cold |
| ---------- | ----------- | ------ | ------------- | ------------- |
| 112 \~ 119 | IME\_BUFFER | Uint32 | IME 조합 임시 버퍼  | Cold          |
| 120 \~ 127 | SYS\_WORK   | Uint32 | 시스템 작업용 임시 공간 | Warm          |

### Core 불변 규칙

- Index 0\~127은 재배치·의미 변경 불가
- Heap 할당 금지, TypedArray 직접 접근만 허용
- Hot 영역은 프레임 루프 필수 접근
- Scratch Pad는 연산 종료 시 의미 소멸
- IME\_BUFFER는 Core 논리 비소유, 연결용 Shadow 슬롯

---

## UI Data Sector

UI Data Sector는 UI의 **유일한 실데이터 저장소**이며, Core 이후 가장 중요한 고정 구조 영역이다.

### 기본 구성 규칙

- **8 indices = 1 UI 영역(UI record)**
- 모든 UI는 고정 폭 레코드로 표현된다.
- 인덱스 기반 직접 접근만 허용된다.
- 레코드 내부 필드 재배치는 허용되지 않는다.

### UI Record Index Map (per UI)

UI Data Sector의 각 UI 레코드는 **Header를 포함한 8 indices 고정 구조**로 구성된다. 기존 레코드는 인덱스를 하나씩 뒤로 밀고, 0번 슬롯을 UI Header로 사용한다.

| Offset | 데이터 계층              | 비트 성격           | 개념 설명                                                                                |
| ------ | ------------------- | --------------- | ------------------------------------------------------------------------------------ |
| +0     | **Header**          | 혼합              | type / pidx (parent index)                                                           |
| +1     | Geometry            | 실데이터            | x, y 좌표 또는 packed position                                                           |
| +2     | Geometry            | 실데이터            | width, height 또는 보조 기하                                                               |
| +3     | **State1 (System)** | **상위비트 플래그 전용** | 시스템 전용 상태 비트 영역. 생존, 표시, hit-test 허용, 입력 가능, 레이아웃 참여 여부 등 **Core/System에서만 설정·해제**   |
| +4     | **State2 (UI)**     | **UI 상태 비트**    | 이벤트 처리 결과로 발생한 UI 상태 기록 영역. hover, active, focus, drag 등 **이벤트 FSM에 의해 UI 로직에서만 갱신** |
| +5     | Tree                | 실데이터            | parent index / first-child index                                                     |
| +6     | Tree                | 실데이터            | next / prev sibling index                                                            |
| +7     | Text Ref            | 혼합              | 상위비트: text 존재 여부 / 하위비트: offset·length                                               |

(총 8 indices, 고정 stride)

### UI Header 규칙

- Header는 `type / pidx`로 구성된다.
- `pidx === idx` 인 경우 해당 UI는 **root UI**이다.
- `pidx === 0` 인 경우 해당 슬롯은 **재사용 대기 상태**로 간주한다.
- 재사용 대기 상태 UI는 초기화(reset) 및 비교 연산을 수행하지 않는다.
- Header 해석은 Core 로직에서만 수행된다.

---

### UI Data Sector – System State (State1)

| 비트 범위    | 필드명         | 크기     | 기능 및 데이터 레퍼런스적 활용 (Logic in Data)                                                                                    |
| -------- | ----------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| 0 \~ 16  | TICK\_CNT   | 17-bit | [10분+ 결정론적 타이머]- 60fps 기준 약 36분, 144fps 기준 약 15분 보장- 0보다 크면 매 프레임 감산(--) 연산 수행- 0에 도달 시 지연 이벤트(Hover/Long-press) 트리거 |
| 17       | VISIBLE     | 1-bit  | [렌더링 가드] 0이면 해당 노드 및 하위 트리 전체 렌더링 생략                                                                                 |
| 18       | HIT\_TEST   | 1-bit  | [상호작용 가드] 0이면 포인터 충돌 판정 루틴 즉시 스킵                                                                                     |
| 19       | DIRTY       | 1-bit  | [갱신 가드] 0이면 이전 프레임의 캐시를 재사용 (그리기 생략)                                                                                 |
| 20       | STATIC      | 1-bit  | [레이아웃 가드] 1이면 좌표 재계산(UpdateCoord) 루틴 생략                                                                              |
| 21       | CLIPPED     | 1-bit  | [영역 가드] 1이면 부모 컨테이너의 Bound 영역 절삭 계산 수행                                                                               |
| 22       | OPAQUE      | 1-bit  | [블렌딩 가드] 1이면 하단 레이어 가림(Occlusion) 처리 최적화 활용                                                                          |
| 23       | TICK\_EN    | 1-bit  | [타이머 활성화] 1일 때만 상위 TICK\_CNT 감산 로직 가동                                                                                |
| 24       | RESERVED\_S | 1-bit  | [시스템 확장] 커널 알고리즘 추가 시 활용 가능한 예비 비트                                                                                   |
| 25 \~ 30 | RESERVED\_U | 6-bit  | [사용자 확장 영역] 데이터-레퍼런스 활용자가 자신만의 개념(예: 그룹ID, 테마 상태 등)을 구현할 수 있도록 완전히 비워둠                                               |
| 31       | SMI\_GUARD  | 1-bit  | [V8 최적화 가드] 0으로 고정하여 항상 31비트 SMI 정수 범위를 유지 (HeapNumber 승격 방지)                                                        |

---

### UI Data Sector – UI State (State2)

| 비트 범위    | 필드명          | 크기     | 기능 및 데이터 레퍼런스적 활용 (Logic in Data)                   |
| -------- | ------------ | ------ | --------------------------------------------------- |
| 0        | ENABLED      | 1-bit  | [상호작용 잠금] 0이면 모든 입력 수신 및 상태 변화 연산 차단                |
| 1        | CAPTURE      | 1-bit  | [포인터 캡처] 1이면 포인터가 영역을 벗어나도 이 노드로 이벤트 강제 고정          |
| 2        | PRESSED      | 1-bit  | [물리 압력] 포인터 Down/Touch 상태 (시각적 피드백 핵심)              |
| 3        | HOVERED      | 1-bit  | [영역 진입] 포인터가 UI 경계 내에 위치함 (PC 환경 대응)                |
| 4        | SELECTED     | 1-bit  | [논리 선택] 체크박스, 토글, 라디오 등의 활성화 상태                     |
| 5        | DRAGGING     | 1-bit  | [이동 중] 현재 포인터에 의해 위치/값 갱신 연산이 수행 중임                 |
| 6        | EXPANDED     | 1-bit  | [구조 개폐] 트리 노드, 드롭다운, 아코디언 등의 확장 상태                  |
| 7        | READONLY     | 1-bit  | [값 수정 제한] 상태 변화는 허용하되 값(Value) 변경만 차단               |
| 8 \~ 15  | SYS\_UI\_RES | 8-bit  | [커널 서브시스템] 스크롤바, 리스트뷰 등 커널 관리 UI 전용 상태 영역           |
| 16 \~ 30 | CUSTOM\_U    | 15-bit | [사용자 자유 영역] 설계 참고자가 자신만의 비트(예: Error, Loading 등) 정의 |
| 31       | SMI\_GUARD   | 1-bit  | [V8 가드] 0으로 고정하여 31비트 SMI 최적화 경로 유지                 |

---

### 이론적 정제 포인트 – Focus 비트 제거

#### 데이터 무결성 확보 (Single Source of Truth)

포커스 정보가 시스템 전역 레지스터와 개별 UI 노드 양쪽에 동시에 존재할 경우, 상태 불일치(Sync Error)가 발생할 수 있다. 본 명세에서는 **포커스는 오직 전역 레지스터에만 존재**하도록 강제함으로써, 데이터 구조 차원에서 중복과 불일치를 원천 차단한다.

즉, UI Data Sector에는 포커스 상태를 표현하는 비트가 존재하지 않으며, 이는 설계 누락이 아니라 **의도적 제거**이다.

#### 연산 경로 단순화

노드가 포커스 상태인지 판단하기 위해 비트 마스킹을 수행하는 대신,

`focus_idx === idx`

와 같은 단순 정수 비교만으로 판정이 가능하다. 이는 V8 엔진에서 SMI 정수 비교로 최적화되며, 분기·메모리 접근·마스킹 연산을 모두 제거한다.

#### Capture 비트의 도입 (대체 역할)

기존 포커스 비트가 차지하던 위치에는 **CAPTURE 비트**가 배치된다. 이는 드래그 중 포인터가 영역을 이탈하더라도 이벤트를 계속 수신해야 하는 모바일 UX의 Latch 동작을 데이터로 제어하기 위함이다.

포커스는 관계(점유)이고, 캡처는 상태(행동)이므로 두 개념은 동일 슬롯에 공존하지 않는다.

```javascript
// [Pseudo / Concept Aid]

DECLARE EXTERNAL_REGION

// 일방향 소비
external_data -> consume_only

// 내부 상태 변경 금지
IF external_data mutates internal_state THEN reject
// 무효화 조건 필수
IF invalidation_rule == undefined THEN reject
// 역할 가드
IF write_origin == External THEN reject
// 무효화 조건 필수
IF invalidation_rule == undefined THEN reject
```

\- 반복 계산 결과를 저장하는 파생 데이터 영역이다.

\- 항상 Core State로부터 재생성 가능해야 한다.

\- 무효화 조건이 명확하지 않은 캐시는 허용되지 않는다.



### About The External Boundary Region

```javascript
// [Pseudo / Concept Aid]

DECLARE EXTERNAL_REGION

// 일방향 소비
external_data -> consume_only

// 내부 상태 변경 금지
IF external_data mutates internal_state THEN reject
```

---

- Canvas, 렌더링 파이프라인, 외부 API와 맞닿는 영역이다.
- 이 영역의 데이터는 **시스템 내부 상태로 역류하지 않는다**.

---

## 6. 이벤트 처리 원칙

- 입력 이벤트는 즉시 로직을 실행하지 않고 **상태 변환 데이터로 축적**된다.
- move / drag / hover 구분은 플래그 조합으로 결정된다.
- 이벤트 해석은 항상 **이전 프레임 상태**를 기준으로 수행된다.

---

## 7. 최적화 안정 조건 (Optimization Stability)

- 인라이닝이 깨질 수 있는 구조를 설계 단계에서 제거한다.
- 의미 해석이 필요한 동적 타입 전환을 금지한다.
- 최적화는 유도하지 않으며, **깨질 조건을 만들지 않는 것**을 목표로 한다.

---

## 8. TypedArray 사용 규율

- TypedArray는 **데이터 형태 고정과 메모리 안정성 확보 수단**이다.
- Core / Cache / Boundary 영역에서 목적에 따라 제한적으로 사용한다.
- 모든 데이터를 TypedArray로 강제 수용하는 설계를 금지한다.

---

## 9. 금지 목록 (Hard No)

- 동적 프로퍼티 추가/삭제
- 의미 해석 기반 분기
- 렌더링 단계에서의 상태 변형
- GC를 전제로 한 설계

---

## 10. 문서 사용 지침

- 본 문서는 설명서가 아니다.
- 구현 중 의심이 발생하면 **본 문서와의 충돌 여부를 우선 확인**한다.
- 충돌하지 않는 변경만 허용된다.

---

> 이 문서는 상호검증 결과의 교집합이다. 이해되지 않아도 된다. 지켜지면 된다.

---

## Rendering Shortcut Lists (Root / Dynamic)

본 리스트들은 **렌더링 순회를 위한 파생 데이터 구조**이며, UI Data Sector 이후에 배치된다. 이 영역은 상태를 저장하지 않으며, **이미 확정된 데이터(UI Header, Tree, State 비트)를 해석한 결과만을 담는다.**

### Root UI List (Packed Index Format)

Root UI List는 단순히 `pidx`만을 나열하지 않는다. 이는 데이터 낭비이자 캐시 효율을 해치는 설계이기 때문이다.

각 슬롯은 다음과 같이 **상·하위 비트를 분할 사용**한다.

- 상위 비트: Root UI의 `idx`
- 하위 비트: **현재 Focus된 하위 UI의 ****\`\`**** (Shortcut)**

이를 통해 루트 단위 렌더링 진입 시, 별도의 트리 탐색 없이 즉시 Focus 경로로 점프할 수 있다. 이 값은 상태가 아니라 **순회 가속용 힌트**이며, Focus 변경 시 동기 갱신된다.

- Focus가 루트 자신일 경우, 하위비트는 0
- 하위비트 값은 UI Data Sector를 대체하지 않으며, 불일치 시 언제든 폐기 가능

### Dynamic UI List (Packed Index Format)

Dynamic UI List 역시 동일한 패킹 규칙을 적용한다.

- 상위 비트: Dynamic 대상 UI의 `idx`
- 하위 비트: **해당 UI 기준 Focus된 하위 UI의 ****\`\`**** 또는 최근 활성 경로 힌트**

Dynamic List는 DIRTY, TICK, 애니메이션 등으로 인해 **프레임 내 재계산이 필요한 UI 집합**을 나타내며, 하위비트 Shortcut은 재귀 진입 비용을 줄이기 위한 순회 보조 정보로만 사용된다.

### 불변 규칙

- Shortcut 필드는 상태가 아니다.
- UI Data Sector의 Tree / State를 절대 대체하지 않는다.
- 불일치 발생 시 무조건 UI Data Sector가 진실이다.
- 이 리스트들은 언제든 재생성 가능해야 한다.

이로써 Root / Dynamic 리스트는 단순 참조 테이블이 아니라, **데이터를 이용한 렌더링 순회 숏컷 구조**로 정의된다.

---

## Rendering Traversal Lists (UI Data Sector 이후)

렌더링 단계에서는 UI Data Sector의 모든 노드를 직접 순회하지 않는다. 대신 **사전에 구성된 두 개의 리스트**를 통해 순회 범위를 제한하고, 분기 비용을 제거한다.

### Root UI List

**정의**: 렌더링 트리의 시작점이 되는 UI 노드들의 선형 리스트

**구성 기준**:

- `pidx === idx` 인 UI (root UI)
- `State1.VISIBLE === 1`

**역할**:

- 렌더링 트리 순회의 진입점 제공
- 불필요한 비가시 트리 전체 스킵

**의존 관계**:

- Core → Root UI List (생성/갱신)
- Root UI List → UI Data (읽기 전용)
- UI Data → Root UI List ❌

---

### Dynamic UI List

**정의**: 프레임 단위로 상태 변화가 발생한 UI 노드들의 리스트

**구성 기준**:

- `State1.DIRTY === 1`
- 또는 좌표/가시성/상태 변경이 발생한 UI

**역할**:

- 부분 렌더링 대상 선별
- 캐시 재사용 여부 판단의 입력 데이터

**특성**:

- Frame 영역에서 생성
- 프레임 종료 시 폐기

**의존 관계**:

- Core → Dynamic UI List (생성)
- Dynamic UI List → UI Data (읽기)
- Dynamic UI List → Cache (무효화 판단)

---

## Rendering Traversal Flow 요약

1. Root UI List를 기준으로 트리 순회 시작
2. VISIBLE / CLIPPED / OPAQUE 가드에 따라 하위 탐색 결정
3. Dynamic UI List를 통해 실제 갱신 대상만 렌더링

(렌더링 단계는 UI Data Sector를 직접 수정하지 않음)


[IME 전용 설계 명세] 원자적 상태 머신 및 슬롯 제어 시스템
본 명세는 텍스트 커널로 데이터를 이관하기 전, 입력 이벤트의 상태 전이와 조합(Composition)을 담당하는 IME의 내부 구조만을 규정한다.
1. IME 구조적 불변 조건 (Immutable Constraints)
IME는 데이터를 영구 보존하지 않는 휘발성 상태 머신으로 동작하며, 다음 세 영역의 격리를 유지한다.
구성 요소	역할 및 성격	데이터 생명주기
Input Buffer	물리 키 입력(KeyCode)의 원시 시퀀스 기록	조합 중 유지, Commit/Cancel 시 즉시 파기
Preedit Buffer	현재 슬롯 상태를 시각적 문자(3-byte Unit)로 환원한 출력 대기열	조합 갱신 시마다 덮어쓰기(Overwrite)
Language Ruleset	슬롯 점유 규칙 및 상태 전이 매핑 테이블	시스템 로드 시 메모리 상주 (Read-Only)
2. 슬롯 기반 상태 모델 (Slot-based State Machine)
IME의 핵심은 3개의 논리 슬롯이며, 상태는 슬롯의 값(Value)이 아닌 점유 여부(Occupancy)로 판정한다.
2.1. 슬롯 점유 및 상태 정의
슬롯 인덱스	논리적 단계	점유 조건 (Ruleset 기반)	상태 전이 트리거
Slot 0	Leading (초성)	입력 시퀀스의 시작	(1, 0, 0) : 조합 개시
Slot 1	Nucleus (중성)	Slot 0 점유 중 유효한 모음/결합문자 유입	(1, 1, 0) : 조합 중
Slot 2	Trailing (종성)	Slot 1 점유 중 유효한 종성/받침 유입	(1, 1, 1) : 조합 완료 직전
2.2. 상태 전이 불변 규칙
순차 점유: Slot n은 Slot n-1이 점유된 상태에서만 활성화될 수 있다.
역전이(Rollback): Backspace 입력 시 Slot n이 존재하면 Slot n만 비우며, Slot n이 비어있을 때만 Slot n-1을 수정한다.
원자적 파기: 어떤 이유로든 조합이 취소(Cancel)되면 모든 슬롯은 즉시 Null로 회귀한다.

3. 언어별 룰셋 인터페이스 (Language Ruleset Header)
IME Core가 언어별 세부 로직을 알지 못해도 상태를 제어할 수 있도록 힌트 비트필드를 제공한다.
3.1. Capability Hint Bitfield (8-bit) 명세
비트	명칭	1 (True)의 의미	0 (False)의 의미
bit 7	S0_REQ	Slot 0(초성) 필수 사용	Slot 0 생략 가능
bit 6	S0_COMP	Slot 0 자체 조합 규칙 존재	Slot 0 단순 매핑
bit 5	S1_REQ	Slot 1(중성) 필수 사용	Slot 1 생략 가능
bit 4	S1_COMP	Slot 1 자체 조합 규칙 존재	Slot 1 단순 매핑
bit 3	S2_REQ	Slot 2(종성) 필수 사용	Slot 2 미사용 (2슬롯 체계)
bit 2	S2_COMP	Slot 2 자체 조합 규칙 존재	Slot 2 단순 매핑
bit 1	CASE_SEP	대소문자(Upper/Lower) 분리 처리	구분 없음
bit 0	SPEC_KEY	특수키/기능키 조합 모드 활성화	일반 입력 모드
4. 룰셋 바이트 스트림 및 상태 전이 (Ruleset Byte Stream)
룰셋은 문자가 아닌 '상태 전이 정보'를 바이트 스트림으로 내장한다.
전이 튜플(Transition Tuple): 모든 룰셋 유닛은 [현재 슬롯 상태 + 유입 키코드] → [차기 슬롯 상태 + 변환 결과]를 쌍으로 보유한다.
추적 가능성: 룰셋 정보만으로 현재 조합이 '완성형'인지 '진행형'인지 즉시 판별 가능해야 한다.
결과 스트림: 조합 완료(Commit) 시 룰셋은 3개 슬롯의 최종 결과물을 3바이트 유닛 스트림으로 방출한다.

5. IME 외부 상호작용 및 경계 규칙 (Interaction Rules)
5.1. Commit / Cancel 조건
자동 Commit: 유입된 키코드가 현재 룰셋의 Slot 0~2 어디에도 배치될 수 없는 경우, 기존 버퍼를 Commit하고 새로운 조합을 시작한다.
강제 Commit: Enter, Space 등 제어 키 유입 시 현재 버퍼 상태를 확정하고 종료한다.
포커스 유실: 입력 포커스가 이동할 경우, 현재 Preedit 내용을 즉시 파기하거나 확정하는 정책은 룰셋의 설정에 따른다.
5.2. Undo / Redo 관측 원칙
IME는 스스로 히스토리를 저장하지 않는다.
외부(System)로부터 Undo 명령을 수신하면, IME는 "현재 조합 중인 상태(Preedit)"를 즉시 폐기하는 것으로 책임을 완수한다.
6. 핵심 요약: IME 책임 한계
데이터 비소비: IME는 키코드를 소모하여 사라지게 하지 않고, 슬롯 상태를 변화시키는 트리거로만 사용한다.
문자열 미생성: IME는 완성된 텍스트 스트링을 만들지 않으며, 오직 3바이트 원자적 슬롯 결과물만을 출력한다.
상태 전이 전담: IME의 유일한 존재 이유는 유입된 이벤트가 어느 슬롯에 어느 값으로 안착할지를 결정하는 것이다.

[물리적 연동: Core Register Map ↔ IME Buffer]
Core Index	IME 논리 슬롯 / 기능	연결 규정 (Constraint)
112	IME_STATUS	슬롯 점유 상태 (1,1,0 등) 및 8-bit Capability Hint 기록
113	SLOT_0 (Leading)	조합 중인 초성/시작 유닛 (Ruleset 변환 결과)
114	SLOT_1 (Nucleus)	조합 중인 중성/중간 유닛 (Ruleset 변환 결과)
115	SLOT_2 (Trailing)	조합 중인 종성/최종 유닛 (Ruleset 변환 결과)
116	INPUT_LAST	가장 최근 유입된 원시 KeyCode (Input Buffer의 최상단)
117	PREEDIT_PTR	Preedit Buffer 내 현재 출력 위치 포인터
118~119	SYS_IME_WORK	룰셋 전이 계산을 위한 임시 워크 슬롯 (Shadow)
[절차적 연동: 이벤트 흐름]
입력 (Input): 외부 키 이벤트가 발생하면 INPUT_LAST(116)에 기록됩니다.
전이 (Transition): IME 상태 머신이 Ruleset을 참조하여 IME_STATUS(112)의 점유 비트와 SLOT 0~2(113~115)의 값을 원자적으로 갱신합니다.
출력 대기 (Preedit): 갱신된 슬롯 값은 즉시 Preedit Buffer로 투영되어 화면에 표시될 준비를 마칩니다.
확정 (Commit): 자동/강제 Commit 조건 충족 시, SLOT 0~2의 데이터가 3바이트 유닛 스트림으로 방출되며 모든 IME 관련 레지스터(112~119)는 Null(0)로 회귀합니다.
[연동 불변 규칙]
상태 동기화: IME_STATUS의 점유 비트와 실제 SLOT 레지스터의 유효 데이터는 항상 일치해야 합니다.
직접 수정 금지: 외부(System/UI) 로직은 IME_BUFFER 영역을 직접 수정할 수 없으며, 오직 이벤트를 통한 상태 전이 결과로서만 값이 변경됩니다.
휘발성: 조합 종료 시 레지스터 영역은 즉시 초기화되며, 어떤 잔류 데이터도 다음 조합에 영향을 미쳐서는 안 됩니다.

// testbench.sv 예시
module tb_ime;
    reg clk = 0;
    reg rst_n = 0;
    reg event_valid = 0;
    reg [31:0] input_keycode = 0;
    reg [7:0]  cap_hint = 8'hA5; // 임의의 힌트 값
    reg [1:0]  rs_action = 0;
    reg [31:0] rs_mapped = 0;

    wire [31:0] status, s0, s1, s2;
    wire commit;

    // 인스턴스 연결
// testbench.sv 내부의 인스턴스 연결 부분 수정
ime_core dut (
    .clk             (clk),
    .rst_n           (rst_n),
    .event_valid     (event_valid),
    .input_keycode   (input_keycode),
    .capability_hint (cap_hint),    // 테스트벤치 변수명이 cap_hint라면 이렇게 연결
    .ruleset_action  (rs_action),   // 테스트벤치 변수명이 rs_action라면 이렇게 연결
    .ruleset_mapped  (rs_mapped),
    .ime_status      (status),
    .slot_0          (s0),
    .slot_1          (s1),
    .slot_2          (s2),
    .commit_trigger  (commit)
);

    always #5 clk = ~clk; // 10ns 주기 클락 생성

    initial begin
        $dumpfile("dump.vcd"); $dumpvars(0, tb_ime); // 파형 저장
        #15 rst_n = 1; // 리셋 해제

        // 시나리오 1: 초성(S0) 입력
        #10 event_valid = 1; rs_action = 2'b01; rs_mapped = 32'h1100; // 'ㄱ'
        #10 event_valid = 0; 

        // 시나리오 2: 중성(S1) 입력 (정상 전이)
        #10 event_valid = 1; rs_action = 2'b10; rs_mapped = 32'h1161; // 'ㅏ'
        #10 event_valid = 0;

        // 시나리오 3: 잘못된 입력 (자동 Commit 테스트)
        #10 event_valid = 1; rs_action = 2'b00; 
        #10 event_valid = 0;

        #100 $finish;
    end
endmodule

// =================================================================
// IME Core: Slot-based State Machine (Hand-written based on Spec)
// =================================================================
module ime_core (
    input  wire        clk,
    input  wire        rst_n,
    
    // Control Signal
    input  wire        event_valid,     // 새로운 키코드 유입 신호
    input  wire [31:0] input_keycode,   // INPUT_LAST (Index 116)
    input  wire [7:0]  capability_hint, // IME_STATUS (Index 112 [7:0])
    
    // Ruleset Interface (Simplified for FSM demonstration)
    input  wire [1:0]  ruleset_action,  // 00: Skip, 01: S0, 10: S1, 11: S2 배치가능
    input  wire [31:0] ruleset_mapped,  // 룰셋에 의해 변환된 결과값
    
    // Output Registers (Index 112~115)
    output reg  [31:0] ime_status,      // 점유 상태 및 힌트 기록
    output reg  [31:0] slot_0,          // Leading
    output reg  [31:0] slot_1,          // Nucleus
    output reg  [31:0] slot_2,          // Trailing
    output reg         commit_trigger   // 자동/강제 커밋 방출 신호
);

    // 내부 점유 상태 (Occupancy)
    reg [2:0] occupancy; // [Slot2, Slot1, Slot0]

    // -------------------------------------------------------------
    // 1. 상태 전이 및 슬롯 점유 로직 (Spec 2.1 & 2.2 반영)
    // -------------------------------------------------------------
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            occupancy      <= 3'b000;
            slot_0         <= 32'h0;
            slot_1         <= 32'h0;
            slot_2         <= 32'h0;
            commit_trigger <= 1'b0;
            ime_status     <= 32'h0;
        end else if (event_valid) begin
            case (ruleset_action)
                2'b01: begin // Slot 0 배치 (조합 개시)
                    slot_0    <= ruleset_mapped;
                    occupancy <= 3'b001;
                    commit_trigger <= 1'b0;
                end
                
                2'b10: begin // Slot 1 배치 (조합 중)
                    if (occupancy[0]) begin // S0 점유 중일 때만 가능 (Spec 2.2)
                        slot_1    <= ruleset_mapped;
                        occupancy <= 3'b011;
                    end else begin
                        // 점유 규칙 위반 시 자동 커밋 혹은 무시
                        commit_trigger <= 1'b1;
                    end
                end
                
                2'b11: begin // Slot 2 배치 (조합 완료 직전)
                    if (occupancy[1]) begin // S1 점유 중일 때만 가능
                        slot_2    <= ruleset_mapped;
                        occupancy <= 3'b111;
                    end
                end
                
                default: begin
                    // 배치 불가능한 키코드 유입 시 자동 Commit (Spec 5.1)
                    commit_trigger <= 1'b1;
                    occupancy      <= 3'b000; // 원자적 파기
                end
            endcase
            
            // IME_STATUS 갱신 (Index 112)
            ime_status <= {16'h0, occupancy, capability_hint[7:0]};
        end else begin
            commit_trigger <= 1'b0;
        end
    end

endmodule
