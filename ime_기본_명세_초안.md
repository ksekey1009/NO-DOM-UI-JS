# IME 기본 명세

본 문서는 저수준 UI 시스템 및 텍스트 시스템과 연동되는 IME(Input Method Editor)의 **개념적·구조적 불변 조건**과 **상태 전이 모델**을 명확히 정의한다. 본 명세는 구현을 지시하지 않으며, 구현이 따라야 할 경계와 규칙을 규정한다.

---

## 1. IME의 역할 정의

IME는 키보드 입력을 직접 문자로 확정(commit)하지 않는다.
IME의 1차 책임은 **입력 중 조합 상태(preedit)** 를 안정적으로 유지·갱신하는 것이다.

IME는 다음 세 영역과만 상호작용한다.

- IME Input Buffer (조합 입력 상태)
- IME Output Preedit Buffer (출력 대기 상태)
- Text System (commit 이후 영역)

IME는 Text Raw Data를 직접 수정하지 않으며, commit 시점에만 텍스트 시스템으로 결과를 이관한다.

---

## 2. Preedit의 정의

Preedit란 **아직 확정되지 않았으나 사용자에게 시각적으로 출력되는 문자 조합 상태**를 의미한다.

- Preedit는 자동완성, 언어 변환, 조합 중 문자 표현을 포함한다.
- Preedit 상태의 데이터는 언제든지 변경·취소·확정될 수 있다.
- Commit 이전까지 Preedit는 Text Raw Data에 반영되지 않는다.

IME Output Preedit Buffer는 오직 이 Preedit 상태만을 표현한다.

---

## 3. IME Input Buffer (조합 입력 버퍼)

IME Input Buffer는 **고정 슬롯 기반 상태 버퍼**이다.

### 3.1 슬롯 불변 조건

IME Input Buffer는 반드시 3개의 논리 슬롯을 가진다.

- index 0 : Initial Consonant (초성 / 첫 자음)
- index 1 : Medial Vowel (중성 / 모음)
- index 2 : Final Consonant (종성 / 두 번째 자음)

이 슬롯 배치는 언어와 무관하게 **절대 변경되지 않는 불변 조건**이다.

### 3.2 상태 표현 원칙

IME의 상태는 슬롯의 값 자체가 아니라 **슬롯의 점유 여부**로 판정된다.

즉, 다음 상태는 논리적으로 구분된다.

- (0, -, -) : 초성 대기
- (0, 1, -) : 중성 조합 상태
- (0, 1, 2) : 종성 조합 상태

이 구조를 통해 상태 전이는 조건문이 아닌 **슬롯 점유 규칙**으로만 처리된다.

---

## 4. 언어별 룰셋 필드

IME는 입력 버퍼와 별도로 **언어별 룰셋 필드**를 가진다.

- 동일한 키 입력이라도 룰셋에 따라 다른 조합 결과를 생성할 수 있다.
- 룰셋은 슬롯 점유 가능 여부와 전이 규칙만 정의한다.
- 문자 매핑 테이블은 룰셋 외부 데이터로 취급한다.

이 구조를 통해 영어, 베트남어, 한글 등의 공존 구현이 가능하다.

---

## 5. IME Output Preedit Buffer

IME Output Preedit Buffer는 **출력 전용 버퍼**이다.

- Preedit 상태를 시각적으로 표현하기 위한 버퍼
- 자동완성, 특수 문자 치환(dd / DD 등) 결과 포함
- Commit 이전까지 반복적으로 덮어써질 수 있다

Commit이 발생하면 해당 버퍼는 즉시 초기화되어야 한다.

---

## 6. Commit 규칙

Commit은 다음 조건 중 하나라도 만족할 경우 발생한다.

- 현재 슬롯 상태에서 입력된 키가 더 이상 유효한 슬롯에 배치될 수 없는 경우
- 명시적인 확정 키(Enter, Space, 변환 키 등)가 입력된 경우

Commit 발생 시 IME는 **Text System에 대한 단일 전달 계약(Commit Delivery Contract)** 을 따른다.

### 6.1 Commit Delivery Contract

- Commit 결과는 **문자 스트림(string stream)** 으로 전달된다.
- 전달 위치는 Text System이 관리하는 Text Raw 2차원 배열 기준으로 정의된다.

정확한 기록 규칙은 다음과 같다.

```
text_raw[editable_text_ui_idx][(last_string_input_cursor + 1) * 3] = commit_string_stream_start
```

- `editable_text_ui_idx` : UI instance pool 상의 editable text UI 인덱스
- `last_string_input_cursor` : Text System이 관리하는 마지막 입력 커서 위치
- IME는 커서 계산, 누적 길이, 배열 확장을 직접 수행하지 않는다

IME는 오직 **commit 문자열 스트림의 시작 지점**만을 제공하며,
메모리 배치 및 후속 정렬은 전적으로 Text System의 책임이다.

Commit 이후:

1. Output Preedit Buffer의 내용은 더 이상 유효하지 않다
2. IME Input Buffer는 즉시 초기화된다
3. Output Preedit Buffer는 즉시 초기화된다

IME는 Commit 이후 상태를 유지하지 않는다.

---

## 7. Text System과의 경계

IME는 Text Raw Data를 직접 관리하지 않는다.

- Text Raw Data는 **2차원 배열 구조**를 가질 수 있다.
- 이 경우 각 editable text UI는 Text Raw의 하나의 row와 1:1로 매칭된다.
- 해당 구조는 누적 문자열 길이 계산을 제거하고, UI instance pool과의 직관적 결속을 제공한다.

### 7.1 Text Ref의 재정의

Text Ref는 IME 연계 개념으로 제안되었으나,
Text Raw가 2차원 배열 구조를 취할 경우 **입력 위치 추적 용도로서의 의미는 축소된다**.

이에 따라 Text Ref는 다음 용도로 한정된다.

- 클립보드 데이터 관리
- 복사 / 붙여넣기 / 선택 영역 보존
- 외부 시스템과의 데이터 교환용 메타 구조

Text Ref는 IME commit 경로에서 사용되지 않는다.
IME는 Text Ref의 존재를 전제로 하지 않으며,
Text Ref의 갱신 여부는 Text System 또는 상위 Command System의 책임이다.

이 경계를 침범하는 IME 구현은 명세 위반으로 간주한다.

---

## 8. redo / undo와 IME의 관계

redo / undo는 키 입력 이벤트가 아니다.

- redo / undo는 포커스 이동, 상태 전이, UI 구조 변경을 포함하는 **현상(history)** 이다.
- 이는 단일 입력 스트림으로 환원될 수 없으며, IME의 책임 범위를 초과한다.

따라서 다음 규칙은 불변 조건으로 선언된다.

- IME는 redo / undo 히스토리를 관리하지 않는다
- IME는 commit 이전의 조합 상태(preedit)만을 책임진다
- commit 이후의 시간 축 관리는 **System-level Command / History Manager**의 책임이다

IME는 redo / undo 이벤트를 **결과적으로 관측될 수는 있으나**,
해당 이벤트의 원인·저장·재현에는 관여하지 않는다.

---

## 9. 설계 원칙 요약

- IME는 상태 머신이며, 데이터 변환기가 아니다.
- 슬롯 인덱스는 상태이며, 값은 부차적이다.
- Preedit와 Commit은 명확히 분리되어야 한다.
- redo / undo는 IME 외부의 시스템 현상이다.
- 정확성이 지연보다 우선한다.

본 명세는 IME 구현의 최소 안전 조건을 정의한다.

---

## 9. Text Raw 소비 금지 원칙

IME 및 Text System은 텍스트를 **소비(stream)** 대상으로 취급하지 않는다.
텍스트는 이벤트 결과가 아니라 **보존되는 상태 데이터**로 간주되어야 한다.

- 키 입력은 순간 이벤트이나
- 텍스트는 누적·보존되는 구조적 데이터이다.

IME는 문자를 즉시 생성·소비하지 않으며, commit 시점에 **Text Raw에 기록될 수 있는 단위 정보**만을 생성한다.

---

## 10. Commit 결과 기록 단위

Commit 결과는 문자열이 아니라 **슬롯 기반 조합 결과 스트림**이다.

- 한글 기준: (initial, medial, final) 3슬롯
- 기타 언어: 사용되지 않는 슬롯은 공백으로 유지

Commit 결과는 다음 위치부터 기록된다.

- text_raw[editable_text_ui_idx][(last_input_cursor + 1) * 3]

이 위치는 commit 문자열 스트림의 시작점이다.

IME는 이 이후의 메모리 배치, 확장, 재배열에 관여하지 않는다.

---

## 11. 출력 문자열의 파생성 원칙

출력 문자열은 **원천 데이터가 아니다**.
출력 문자열은 언제든지 폐기 가능한 **파생 캐시**이다.

문자 출력은 다음 절차를 따른다.

1. Text Raw의 특정 UI 인덱스 영역을 순회
2. 각 슬롯 집합을 유니코드 실라블 계산 값으로 환원
3. 출력용 문자열 변수에 순차 누적
4. 누적 완료 후 렌더링

이미 출력 문자열이 존재하는 경우:

- 전체 재생성을 금지한다
- 문자열 길이 기준으로 부족한 분량만 계산·누적한다

이 규칙은 성능 최적화가 아닌 **구조적 불변 조건**이다.

---

## 12. Text Ref의 역할 제한

Text Ref는 Text Raw의 대체물이 아니다.

Text Ref는 다음 용도로만 허용된다.

- 클립보드
- 복사/붙여넣기
- 외부 데이터 교환

Text Raw가 2차원 배열 구조를 가질 경우, Text Ref는 내부 탐색·렌더링 경로에서 사용되지 않는다.

---

## 13. Redo / Undo의 경계 선언

Redo / Undo는 IME의 책임 영역이 아니다.

Redo / Undo는 다음 요소들과 결합된다.

- 키 입력 이벤트
- 포커스 이동
- UI 상태 전이
- 커서 이동

따라서 Redo / Undo는 **Command System 기반의 전역 히스토리 매니저**에서 관리되어야 한다.

IME는 Redo / Undo 명령의 결과를 입력으로 받을 수는 있으나,
히스토리 생성 및 관리에는 관여하지 않는다.

---

## 14. IME 책임 범위 최종 요약

- IME는 문자를 저장하지 않는다
- IME는 문자열을 생성하지 않는다
- IME는 상태와 경계만 생성한다

문자의 생성, 보존, 출력은 모두 Text System의 책임이다.

이 경계를 넘는 구현은 명세 위반으로 간주한다.


---

## 15. IME 언어 룰셋 헤더 명세 (Language Ruleset Header)

본 항목은 IME의 **언어별 조합 규칙 모듈**이 반드시 제공해야 하는 최소 헤더 구조를 정의한다.
이 헤더는 IME Core가 언어별 내부 규칙을 해석하지 않고도 **입력 슬롯 사용 가능성**과 **상태 전이 가능성**을 즉시 판단하기 위한 힌트 정보이다.

룰셋 헤더는 고정 길이 배열이며, Uint8Array 기반으로 정의된다.

### 15.1 헤더 기본 구조

룰셋 헤더는 최소 2바이트를 가진다.

- header[0] : Language Identifier
- header[1] : Capability / Hint Bitfield

이 구조는 확장 가능하지만, 0~1 인덱스의 의미는 절대 변경될 수 없다.

---

### 15.2 header[0] : Language Identifier

- 8비트 정수 값
- 국가 코드 또는 언어 코드로 사용

예시:
- 82 : Korean
- 69 : English
- 86 : Vietnamese

IME Core는 이 값을 **비교 또는 로깅 용도**로만 사용하며, 내부 로직 분기에는 관여하지 않는다.

---

### 15.3 header[1] : Capability / Hint Bitfield

header[1]은 슬롯 사용 가능성과 조합 규칙 존재 여부를 나타내는 **힌트 전용 비트 필드**이다.
이 정보는 상태 전이 가속을 위한 것이며, 정합성을 강제하지 않는다.

비트 정의는 다음과 같다.

- bit 7 : Initial Consonant exists
- bit 6 : Initial Consonant composition rule exists
- bit 5 : Medial Vowel exists
- bit 4 : Medial Vowel composition rule exists
- bit 3 : Final Consonant exists
- bit 2 : Final Consonant composition rule exists
- bit 1 : UpperCase / LowerCase separation
  - 1 : UpperCase / LowerCase 분리
  - 0 : 구분 없음
- bit 0 : Special or Function key flag
  - 1 : 특수키 / 숫자 / 기능키
  - 0 : 일반 문자 입력 키

---

### 15.4 설계 원칙 및 제약

- 이 비트 필드는 **규칙의 존재 여부만을 나타낸다**
- 실제 조합 방식, 유니코드 계산, 문자 매핑은 절대 포함하지 않는다
- 헤더 정보는 틀릴 수 있으며, IME Core는 항상 Input Buffer 상태를 진실의 원천으로 삼는다

즉, 이 헤더는 판단의 근거가 아니라 **판단을 빠르게 하기 위한 힌트**이다.

---

### 15.5 영어 룰셋의 특수성

영어 룰셋은 다음 특성을 가진다.

- 조합 규칙 테이블을 요구하지 않는다
- 입력 즉시 Commit 가능
- Redo / Undo는 단문자 단위 롤백까지만 허용

따라서 영어 룰셋의 헤더는 최소 정보만 제공해도 충분하며, 나머지 비트는 0으로 설정될 수 있다.

---

본 헤더 명세는 IME Core와 언어별 확장 모듈 사이의 **계약(contract)** 이며,
이를 위반하는 룰셋은 로드 대상에서 제외될 수 있다.

---

## 15.6 룰셋 바이트 스트림 표현 원칙

언어별 룰셋은 최종적으로 **1차원 바이트 스트림(Byte Stream)** 형태로 제공된다.
이 바이트 스트림은 문자를 직접 표현하지 않으며, **문자 합성 전·후의 상태를 추적 가능하게 하는 중간 표현**이다.

- 룰셋 바이트 스트림은 문자 코드가 아니다
- 바이트 스트림 상태만으로는 출력 문자로 변환할 수 없다
- 실제 문자 출력은 반드시 **슬롯 인덱스 기반 계산 로직**을 경유해야 한다

즉, 룰셋은 "문자를 담는 구조"가 아니라 "상태 전이를 설명하는 구조"이다.

---

## 15.7 상태 전이 추적 가능성

룰셋 바이트 스트림은 다음 정보를 동시에 보존해야 한다.

- 합성 이전 상태
- 합성 이후 상태

이로 인해 특정 언어(예: 베트남어)의 경우:

- 합성된 문자 여부만 검사해도
- 룰셋 자체 정보만으로 즉시 롤백 가능하다

이는 redo / undo 차원의 문제가 아니며,
**룰셋 테이블이 상태 전이 전·후 정보를 모두 내장**하고 있기 때문에 가능한 동작이다.

IME Core는 이를 활용할 수 있으나, 이를 전제로 로직을 구성해서는 안 된다.

---

## 15.8 Capability Bitfield 예시 (베트남어)

베트남어 룰셋의 Capability / Hint Bitfield 예시는 다음과 같다.

- header[0] = 0x56 (Vietnamese)
- header[1] = 0xF2

0xF2는 다음 성격을 나타낸다.

- Initial Consonant 존재 및 조합 규칙 존재
- Medial Vowel 존재 및 조합 규칙 존재
- Final Consonant 슬롯 미사용
- Upper / Lower case 구분
- 일반 문자 입력 (기능키 아님)

이 값은 규칙의 진실을 보장하지 않으며,
IME Core가 **분기 비용을 줄이기 위한 힌트**로만 사용된다.

IME Core의 판단 근거는 항상 IME Input Buffer 상태이며,
룰셋 헤더 정보는 참고 정보로만 취급된다.

---

## 15.9 바이트 스트림과 Text System의 분리

룰셋 바이트 스트림은 Text Raw, Text Ref, 출력 문자열과 직접 연결되지 않는다.

- 룰셋 바이트 스트림은 상태 전이용
- Text Raw는 보존 데이터
- 출력 문자열은 파생 캐시

이 세 영역은 어떤 경우에도 혼합되어서는 안 된다.

이 분리 원칙을 위반하는 구현은 IME 명세 위반으로 간주한다.

