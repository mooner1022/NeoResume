import type { Lang, ProjectDetail } from '../types';

// Written from mooner1022/neon-js (docs, code, commit bodies), its Actions runs and the Maven Central listing.
// Test figures are the ones CI prints; timings in the cases are the measurements recorded in the commits.
// Left out: README-only figures (Test262 staging, the Galaxy Z Fold7 numbers) and the one Rhino timing.
export const neonjs: Record<Lang, ProjectDetail> = {
	ko: {
		lead: 'Kotlin으로 작성한 **JVM용 JavaScript 엔진**입니다. 믿을 수 없는 스크립트를 Java/Kotlin 앱 안에서 돌리기 위해 만들었고, 바이트코드 인터프리터와 JVM 바이트코드 JIT, 실행 제한 샌드박스, Java/Kotlin 상호 운용을 갖췄습니다. Android(API 26+)에서도 동작합니다.',
		facts: [
			{ k: 'Period', v: '2026.10 공개 · 0.1.4 (2026.10.17)' },
			{ k: 'Role', v: '1인 · 설계 · 개발 · 릴리스' },
			{ k: 'Stack', v: 'Kotlin · JVM 21 · ASM · ICU4J · OkHttp' },
			{ k: 'Tests', v: 'Test262 48,747 / 48,747 · Intl 3,363 / 3,365' },
			{ k: 'Android', v: 'API 26+ · JIT 클래스를 dx·D8로 dex 변환' },
			{ k: 'Release', v: 'Maven Central · 모듈 6개 · Apache-2.0' }
		],
		structure: {
			intro: 'Gradle 모듈 여덟 개로 되어 있습니다. 엔진은 `neonjs-core` 하나로 돌고, 나머지는 필요할 때 더하는 모듈입니다. Kotlin 코드는 본문 약 58,000줄, 테스트 약 7,400줄입니다.',
			items: [
				{ name: 'neonjs-core', text: '파서, 바이트코드 컴파일러, 인터프리터, JIT, 내장 객체, 처음부터 새로 쓴 정규식 엔진, 샌드박스, Java 상호 운용, URL·Blob·이벤트 같은 웹 전역.' },
				{ name: 'neonjs-intl', text: 'ICU4J 위에 올린 `Intl`과 Temporal의 비ISO 달력. 클래스 경로에 두면 켜집니다.' },
				{ name: 'neonjs-net', text: 'OkHttp 위의 `fetch`와 `WebSocket`. 허용한 호스트와 주소 대역에만 연결합니다.' },
				{ name: 'neonjs-node', text: '`node:` 모듈, `require`, `Buffer`. JS 쪽 라이브러리의 상당수는 Node.js v26.11.1 소스를 옮겨 왔습니다.' },
				{ name: 'neonjs-android', text: 'JIT가 만든 클래스를 dx로, `-d8` 모듈을 더하면 D8로 dex로 바꿔 메모리에서 올립니다.' },
				{ name: 'neonjs-cli', text: '명령행 실행기와 REPL. Node API, 네트워크 허용 목록, `.env` 파일을 옵션으로 받습니다.' },
				{ name: 'neonjs-test262', text: 'Test262, web-platform-tests, Node.js 자체 테스트를 돌리는 러너와 무작위 변이 퍼저, 기기 점검(AndroidCheck).' }
			]
		},
		architecture: {
			intro: '소스는 **파서 → 스코프 분석 → 바이트코드** 순서로 바뀌고, 인터프리터가 먼저 실행합니다. 기본인 적응형 모드에서는 1,000번 넘게 불린 함수나 오래 도는 반복문을 **백그라운드 스레드가 JVM 바이트코드로 컴파일**해 갈아 끼웁니다.',
			notes: [
				'실행 모드는 인터프리터, 전부 컴파일, 적응형 세 가지입니다. 적응형에서는 컴파일이 끝날 때까지 인터프리터로 계속 돌고, 컴파일은 최대 32개씩 묶어서 합니다.',
				'JIT 클래스 이름은 생성기가 읽는 입력 전체의 SHA-256입니다. 이름이 같으면 클래스 파일도 같아서, 상수나 위치만 다른 함수와 여러 컨텍스트에서 도는 같은 코드가 **클래스 하나를 나눠 씁니다**.',
				'숫자 unboxing과 인라이닝은 **추측하지 않습니다**. 타입은 명령이 만드는 값으로만 정하고, 그 때문에 지우는 검사도 deopt도 없습니다. 종류를 잘못 붙이면 다른 숫자로 읽히지 않고 예외로 드러납니다.',
				'플랫폼마다 다른 부분은 클래스를 정의하는 `CodeDefiner` 하나에 모았습니다. HotSpot에서는 hidden class로, Android에서는 dx나 D8이 만든 dex로 올리고, 어느 쪽도 쓸 수 없으면 인터프리터만 씁니다.',
				'샌드박스는 시간, 명령 수, 호출 깊이, 문자열 길이, 메모리(HotSpot에서만)를 제한하고, 호스트 접근은 기본 거부입니다. 스크립트의 `catch`와 `finally`는 종료를 가로채지 못합니다.',
				'HotSpot은 8,000바이트가 넘는 메서드를 JIT하지 않습니다. 그래서 인터프리터와 런타임의 메서드를 그보다 작게 유지하고, 테스트가 이를 검사합니다.',
				'StarLight의 `nightly` 브랜치에는 Rhino와 나란히 두 번째 JavaScript 언어로 들어가 있습니다(0.1.3).'
			]
		},
		cases: [
			{
				title: 'Android 8.0·8.1에서 런타임이 중단된다',
				problem: 'API 26 에뮬레이터 CI가 JIT 스레드에서 `Check failed: self == thread_running_gc_`로 죽었습니다. ART 8.x는 인터페이스 메서드의 유일한 구현을 기록해 두고, 그 구현의 클래스 로더가 내려간 뒤에도 그 기록을 다시 읽습니다. 처음 올리는 시험용 클래스가 바로 그 유일한 구현이었습니다.',
				approach: '엔진 로더에 `CompiledCode` 구현 두 개를 미리 링크해 **ART가 이 메서드를 추적하지 않게** 했습니다. 같은 버전에서는 `Java.extend` 어댑터를 내리지 않고, 기기 스크립트가 크래시 로그의 네이티브 백트레이스를 출력하게 했습니다.',
				result: '다음 Android CI부터 통과했습니다. 지금은 API 26과 34 에뮬레이터에서 기기 점검 7개와 Test262 부분집합 15,789개가 모두 통과합니다.'
			},
			{
				title: 'JIT 클래스가 75만 개 넘게 생긴다',
				problem: 'JIT 클래스 이름이 명령과 레지스터 수만 반영해, Test262에서 이름 78개가 실제로는 다른 코드를 가리켰습니다. 이대로는 클래스 여러 개를 dex 하나에 담을 수 없었고, 같은 코드도 블록마다 클래스를 새로 만들었습니다.',
				approach: '이름을 생성기 입력 전체의 SHA-256으로 바꿔 **이름이 같으면 클래스 파일도 같게** 했습니다. 생성 클래스는 상태가 없으므로, 입력이 같은 블록은 약한 참조 캐시에 둔 인스턴스 하나를 함께 씁니다.',
				result: '커밋에 기록한 측정으로, Test262 컴파일 모드에서 생성 클래스가 **756,204개에서 75,915개로** 줄고 실행 시간은 약 150초에서 35초가 됐습니다. 이름 51,915개가 서로 다른 클래스 파일 51,915개와 정확히 맞습니다.'
			},
			{
				title: 'dex 변환의 고정 비용이 함수 수만큼 쌓인다',
				problem: 'Android에서는 JIT 클래스를 dex로 바꿔야 하는데, dx와 D8은 부를 때마다 드는 고정 비용이 큽니다. 함수마다 따로 변환하면 그 비용이 함수 수만큼 쌓입니다.',
				approach: '컴파일을 **백그라운드 데몬 스레드로** 옮기고, 최대 32개씩 묶어 배치 하나를 dex 하나, 클래스 로더 하나로 만들었습니다. 한 블록은 한 스레드만 컴파일하고, 배치가 거부되면 클래스별로 다시 정의합니다. 워커가 쓴 시간은 스크립트의 실행 제한에 넣지 않습니다.',
				result: '커밋에 기록한 측정으로, 데스크톱 JVM에서 함수 5,000개를 한꺼번에 컴파일했을 때 dx는 1,331ms에서 671ms로, D8은 7,150ms에서 2,400ms로 줄었습니다. dx를 거쳐도 Test262 48,747개가 모두 통과합니다.'
			},
			{
				title: '컴파일된 코드가 계산마다 숫자를 박싱한다',
				problem: '생성 코드가 모든 값을 `Object`로 들고 있어서, 산술 연산 한 번마다 `Double`을 새로 만들었습니다.',
				approach: '정방향 타입 분석으로 레지스터와 스택 슬롯에 double, int32, 그 밖의 종류를 붙이고, 숫자만 담는 레지스터는 JVM 지역 변수로 둡니다. int는 비트 연산 결과처럼 정의상 int32인 값에만 쓰고 산술은 double로 해서, **오버플로와 `-0`을 그대로 지킵니다**.',
				result: '커밋에 기록한 측정으로, ART 에뮬레이터에서 빈 루프가 반복당 9.22ns에서 0.70ns로, xorshift32가 25.3ns에서 3.5ns로 줄었습니다. 인터프리터와 결과를 비교한 무작위 수치 함수 60,000개에서 불일치가 없었고, Test262는 unboxing을 켜고 끈 양쪽에서 통과합니다.'
			},
			{
				title: 'HotSpot과 Android에서 다른 메서드가 불린다',
				problem: '변환 비용이 같은 오버로드 중 리플렉션이 먼저 나열한 것이 골라졌는데, HotSpot과 ART는 나열 순서가 다릅니다. 그래서 `sb.append(null)`이 VM에 따라 다른 메서드를 불렀습니다. 2^53을 넘는 long ID는 JS 숫자로 바뀌면서 끝자리가 달라졌습니다.',
				approach: '동점이면 Java처럼 **가장 구체적인 타입**을 고르고, 그래도 같으면 고정된 순서로 정했습니다. 원하는 오버로드를 시그니처로 지정하는 문법도 더했습니다. 2^53 − 1을 넘는 long은 BigInt로 넘깁니다.',
				result: '두 동작 모두 상호 운용 계약 테스트로 고정했고, Android 기기 점검도 long의 경계값을 확인합니다.'
			},
			{
				title: '샌드박스가 문서와 다르게 동작한다',
				problem: '보안 문서는 바쁜 컨텍스트를 기다리는 시간이 시간 제한으로 묶인다고 했지만, 실제로는 무한정 기다려 두 스레드가 교착될 수 있었습니다. 엔진 자신의 API 클래스는 거부 목록에서 빠져 있었고, `new URL(\'a:#\' + \'x\'.repeat(2e6))`은 시간 제한으로도 멈출 수 없는 2차 시간 루프를 돌았습니다.',
				approach: '락 대기를 시간 제한으로 묶어 넘으면 `NeonTimeoutException`을 내고, 엔진의 모든 패키지와 API 클래스를 거부 목록에 넣었습니다. URL 파서는 선형으로 바꾸고 **4,096단계마다 인터럽트와 제한을 확인**합니다.',
				result: '세 가지 모두 테스트로 고정했습니다. 엔진 패키지에 클래스를 새로 더하면, 테스트에서 그 클래스를 거부할지 무해하다고 선언할지 정해야 합니다.'
			}
		],
		shots: []
	},
	en: {
		lead: 'A **JavaScript engine for the JVM**, written in Kotlin. It is built to run untrusted scripts inside Java/Kotlin applications, with a bytecode interpreter, a JIT to JVM bytecode, a sandbox with execution limits and Java/Kotlin interop. It also runs on Android (API 26+).',
		facts: [
			{ k: 'Period', v: 'Public 2026.10 · 0.1.4 (2026.10.17)' },
			{ k: 'Role', v: 'Solo · design · build · release' },
			{ k: 'Stack', v: 'Kotlin · JVM 21 · ASM · ICU4J · OkHttp' },
			{ k: 'Tests', v: 'Test262 48,747 / 48,747 · Intl 3,363 / 3,365' },
			{ k: 'Android', v: 'API 26+ · JIT classes to dex via dx or D8' },
			{ k: 'Release', v: 'Maven Central · 6 modules · Apache-2.0' }
		],
		structure: {
			intro: 'Eight Gradle modules. The engine runs on `neonjs-core` alone; the others are added when needed. About 58,000 lines of Kotlin in the main code and 7,400 in tests.',
			items: [
				{ name: 'neonjs-core', text: 'Parser, bytecode compiler, interpreter, JIT, built-ins, a RegExp engine written from scratch, the sandbox, Java interop, and web globals such as URL, Blob and events.' },
				{ name: 'neonjs-intl', text: '`Intl` and the non-ISO Temporal calendars on ICU4J. On the class path, it is switched on.' },
				{ name: 'neonjs-net', text: '`fetch` and `WebSocket` over OkHttp, reaching only the hosts and address ranges allowed.' },
				{ name: 'neonjs-node', text: '`node:` modules, `require` and `Buffer`. Much of the JS side is ported from the Node.js v26.11.1 sources.' },
				{ name: 'neonjs-android', text: 'Turns the classes the JIT generates into dex with dx, or with D8 through the `-d8` module, and loads them from memory.' },
				{ name: 'neonjs-cli', text: 'A command-line runner and REPL, with options for the Node APIs, a network allow list and `.env` files.' },
				{ name: 'neonjs-test262', text: 'Runners for Test262, web-platform-tests and Node.js’s own tests, a mutation fuzzer, and an on-device check (AndroidCheck).' }
			]
		},
		architecture: {
			intro: 'Source goes **parser → scope analysis → bytecode**, and the interpreter runs it first. In the default adaptive mode, functions called more than 1,000 times, or loops that run long, are **compiled to JVM bytecode on background threads** and swapped in.',
			notes: [
				'Three modes: interpreter only, compile everything, adaptive. In adaptive mode a function keeps running interpreted until its code is ready, and compilation goes in batches of up to 32.',
				'A JIT class is named by a SHA-256 of everything the generator reads, so equal names mean equal class files: functions that differ only in constants or position, and the same code run in many contexts, **share one class**.',
				'Unboxed numbers and inlining are **not speculative**. Types come only from what instructions produce; no check is removed because of them and nothing deoptimizes. A wrong type surfaces as an exception instead of reading as another number.',
				'What differs per platform sits behind one `CodeDefiner`: hidden classes on HotSpot, dex from dx or D8 on Android, and the interpreter alone when neither is available.',
				'The sandbox limits time, instructions, call depth, string length and memory (HotSpot only), and denies host access by default. A script’s `catch` and `finally` cannot intercept termination.',
				'HotSpot does not JIT methods over 8,000 bytes, so the interpreter and runtime keep their methods under that, and a test checks it.',
				'On StarLight’s `nightly` branch it sits next to Rhino as a second JavaScript language (0.1.3).'
			]
		},
		cases: [
			{
				title: 'The runtime aborts on Android 8.0 and 8.1',
				problem: 'The API 26 emulator CI died on a JIT thread with `Check failed: self == thread_running_gc_`. ART 8.x records the only implementation of an interface method and reads that record again even after the class loader behind it is gone, and the probe class loaded first was that only implementation.',
				approach: 'Two implementations of `CompiledCode` are now linked in the engine’s loader up front, so **ART stops tracking the method**. On those versions `Java.extend` adapters stay loaded, and the device script prints the native backtrace from crash logs.',
				result: 'The next Android CI run passed. Today the API 26 and 34 emulators pass all 7 device checks and a 15,789-test Test262 subset.'
			},
			{
				title: 'More than 750,000 JIT classes',
				problem: 'JIT class names hashed only the instructions and register count, so in Test262 78 names stood for genuinely different code. That ruled out putting several classes in one dex, and the same code got a new class for every block.',
				approach: 'Names became a SHA-256 of everything the generator reads, so **equal names mean equal class files**. Generated classes hold no state, so blocks with the same input share one instance from a weakly held cache.',
				result: 'As measured in the commit, Test262 in compiled mode went **from 756,204 generated classes to 75,915**, and from about 150 s to 35 s. 51,915 names match 51,915 distinct class files.'
			},
			{
				title: 'The fixed cost of dex conversion adds up per function',
				problem: 'On Android, JIT classes must be converted to dex, and every dx or D8 call has a large fixed cost. Converting each function on its own pays that cost once per function.',
				approach: 'Compilation moved to **background daemon threads** that take up to 32 blocks at a time and turn each batch into one dex file and one class loader. Exactly one thread compiles a block, a rejected batch is defined class by class, and worker time is not charged to a script’s limits.',
				result: 'As measured in the commit, compiling 5,000 functions at once on a desktop JVM went from 1,331 ms to 671 ms with dx and from 7,150 ms to 2,400 ms with D8. Through dx, all 48,747 Test262 tests still pass.'
			},
			{
				title: 'Compiled code boxes a number at every step',
				problem: 'Generated code held every value as an `Object`, so each arithmetic step allocated a new `Double`.',
				approach: 'A forward type analysis gives registers and stack slots a kind (double, int32 or anything else), and registers that only hold numbers become JVM locals. Ints are used only for values that are int32 by definition, such as bitwise results, and arithmetic stays in doubles, so **overflow and `-0` behave as before**.',
				result: 'As measured in the commits, on an ART emulator an empty loop went from 9.22 to 0.70 ns per iteration and xorshift32 from 25.3 to 3.5 ns. 60,000 random numeric functions compared against the interpreter showed no mismatch, and Test262 passes with unboxing on and off.'
			},
			{
				title: 'HotSpot and Android call different methods',
				problem: 'Among overloads of equal conversion cost, the one reflection listed first won, and HotSpot and ART list methods in different orders: `sb.append(null)` called a different method depending on the VM. Long IDs beyond 2^53 also changed their last digits on the way to a JS number.',
				approach: 'Ties now go to **the most specific types**, as in Java, then to a fixed order, and a signature can name the overload wanted. Longs beyond 2^53 − 1 cross over as BigInts.',
				result: 'Both are pinned by the interop contract tests, and the Android device check covers the long boundaries.'
			},
			{
				title: 'The sandbox does not do what its docs say',
				problem: 'The security docs said waiting for a busy context was bounded by the time limit, but the wait had no bound and two threads could deadlock. The engine’s own API classes were missing from the deny list, and `new URL(\'a:#\' + \'x\'.repeat(2e6))` ran a quadratic loop that no time limit could stop.',
				approach: 'Lock waits are bounded by the time limit and end in a `NeonTimeoutException`; every engine package and API class is on the deny list; the URL parser is linear and **checks for interrupts and limits every 4,096 steps**.',
				result: 'All three are pinned by tests. A new class in the engine packages must be denied or declared harmless in the test.'
			}
		],
		shots: []
	}
};
