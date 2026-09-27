import type { Lang, ProjectDetail } from '../types';

// Written from amoa-team/amoa-backend (private). He is the only backend developer now; teammates are not named.
// Benchmarks quoted in the cases are from synthetic data on a local machine, and say so.
export const amoa: Record<Lang, ProjectDetail> = {
	ko: {
		lead: '짧은 강의 클립 위에 플레이리스트, 후기, 레시피 공유, 추천, 통합 검색을 얹은 학습 서비스의 백엔드입니다. 백엔드를 혼자 맡아 API와 데이터 모델, **검색과 임베딩 색인 파이프라인**을 만들고 있습니다.',
		facts: [
			{ k: 'Period', v: '2026.06 — 진행 중' },
			{ k: 'Team', v: 'PM · FE · 백엔드 1인' },
			{ k: 'Role', v: '백엔드 전담' },
			{ k: 'Stack', v: 'Kotlin · Ktor · Exposed · Koin' },
			{ k: 'Data', v: 'PostgreSQL · pgvector · pg_trgm · Valkey' },
			{ k: 'Infra', v: 'AWS EC2 · Terraform · GitHub Actions' }
		],
		structure: {
			intro: 'Spring Boot로 시작해 Ktor와 Exposed로 다시 썼고, 지금은 **기능 단위 수직 슬라이스** 구조입니다. 기능마다 도메인이 포트를 갖고 인프라가 구현합니다.',
			items: [
				{ name: 'app/', text: '조립만 합니다. 기능 목록을 등록하고 아키텍처 규칙 테스트를 둡니다.' },
				{ name: 'platform/', text: 'DB, Redis, 아웃박스, 에러 응답, 임베딩과 미디어 같은 외부 서비스 어댑터.' },
				{ name: 'common/', text: '모든 기능이 기대는 계약. 에러 형식, 도메인 이벤트, 트랜잭션, 벡터·검색 SPI.' },
				{ name: 'feature/', text: '계정, 카탈로그, 플레이리스트, 레시피, 추천, 검색 등 11개. 안쪽은 `route → application → domain ← infrastructure` 방향만 허용하고 테스트로 막습니다.' },
				{ name: 'docugen/', text: '라우트 정의에서 OpenAPI 3.1 문서를 만드는 DSL.' },
				{ name: 'search SPI', text: '검색 기능은 다른 기능을 모릅니다. 각 기능이 등록한 검색·자동완성 제공자를 모아서 씁니다.' }
			]
		},
		architecture: {
			intro: '검색은 **벡터 검색과 키워드 검색을 한 SQL 안에서** 돌린 뒤 순위를 합칩니다(RRF). 임베딩은 요청 경로 밖에서, 아웃박스 큐를 도는 워커가 채웁니다.',
			notes: [
				'벡터 쪽은 768차원 임베딩의 앞 512차원(halfvec)으로 HNSW 후보를 뽑고, 후보만 768차원 원본으로 다시 정렬합니다.',
				'키워드 쪽은 `pg_trgm` 유사도로 순위를 매깁니다. 두 결과를 `FULL OUTER JOIN`으로 합쳐 **RRF(k = 60)**로 정렬합니다.',
				'통합 검색은 강의, 클립, 레시피 제공자를 병렬로 부르고, 제공자 사이 순위를 RRF로 한 번 더 합칩니다.',
				'임베딩 서버가 없거나 실패하면 키워드 검색만으로 내려가 응답은 그대로 돌려줍니다.',
				'색인 작업은 콘텐츠를 바꾸는 **같은 트랜잭션에서** 큐에 넣고, 워커가 `FOR UPDATE SKIP LOCKED`로 선점합니다. 실패하면 간격을 늘려 다시 시도하고 5번째에 멈춥니다.',
				'자동완성은 한글을 자모 단위로 비교해, 아직 조합 중인 글자와 초성 입력도 찾아 줍니다.'
			]
		},
		cases: [
			{
				title: '배포할 때마다 색인 작업이 조용히 멈췄다',
				problem: '색인 작업을 선점한 뒤 저장하기 전에 프로세스가 재시작되면, 선점 질의도 누락분을 채우는 스윕도 그 클립을 다시 집지 않았습니다. 오류 없이 색인만 빠진 채 남았고, 로컬 데이터에서는 **53건 중 10건**이 그랬습니다. 개발 서버는 배포할 때마다 재시작하니 매번 생길 수 있는 문제였습니다.',
				approach: '`next_attempt_at`을 "이 시각 전에는 보이지 않는다"는 한 가지 뜻으로 통일했습니다. 대기 중인 작업에는 재시도 시각, 선점한 작업에는 10분짜리 **리스 만료 시각**입니다. 조건 하나로 두 상태를 모두 선점하게 되고, 리스로 되살아난 작업도 시도 횟수를 씁니다. 이미 갇힌 행은 마이그레이션에서 되살렸습니다.',
				result: '리스 관련 통합 테스트 7건을 더하고, 선점 조건을 되돌리면 새 테스트가 실패하는 것까지 확인했습니다. 로컬 데이터 53건이 모두 색인됐습니다.'
			},
			{
				title: '추천 API가 limit 12부터 500을 냈다',
				problem: '2단 벡터 검색을 넣으면서 HNSW 탐색 폭(`ef_search`)을 후보 수에서 계산했는데, pgvector의 상한 1000을 확인하지 않았습니다. 기본 요청(`limit=20`)이 `ef_search = 1800`이 되어 500이 났고, `limit`이 12 이상이면 모두 실패했습니다.',
				approach: '상한을 한곳에 두고, `ef_search`가 아니라 **후보 수 자체를** 잘랐습니다. `ef_search`만 낮추면 반복 스캔이 늘어 오히려 느려진다는 측정(40일 때 p50 3.92ms, 200일 때 1.52ms)을 따른 결정입니다. 요청 크기 1–600과 오버페치 배수의 모든 조합에서 상한을 넘지 않는 것을 확인했습니다.',
				result: '실제 PostgreSQL에서만 재현되는 문제라 통합 테스트로 고정했고, 수정 전 코드에서는 그 테스트가 실패하는 것을 확인했습니다.'
			},
			{
				title: '벡터 인덱스를 1/3로 줄이고, 그 대가를 재다',
				problem: '768차원 벡터의 HNSW 인덱스가 행당 4,096B라, 버퍼 128MB 기준 약 3만 3천 행이면 인덱스가 메모리를 넘칠 상황이었습니다. 자막 단위 색인이 들어오면 넘을 규모였습니다.',
				approach: '임베딩을 `halfvec`으로 바꾸고(코사인 거리 최대 오차 7e-5), **앞 512차원으로만 인덱스**를 만든 뒤 후보를 768차원으로 다시 정렬하는 2단 검색을 넣었습니다. 합성 데이터 2만 행에서 256차원은 recall@10 0.862로 기준(0.95)에 못 미쳤고, 512차원은 0.984였습니다.',
				result: '인덱스가 행당 1,366B로 줄어, 메모리를 넘는 시점이 약 9만 8천 행으로 늦춰졌습니다. 대신 2만 행에서는 2단 검색이 더 느렸습니다(p50 7.17ms 대 1.52ms). 이 측정에 따라 데이터가 적은 레시피 검색은 단일 768차원 인덱스로 두었습니다.'
			},
			{
				title: '검색 입구가 다섯 개라 클립이 빠졌다',
				problem: '검색처럼 보이는 API가 다섯 개였고, 프론트엔드 검색 화면이 강의 목록 API를 쓰고 있어 클립이 결과에서 빠졌습니다. 통합 검색을 하나 더 만드는 것만으로는 잘못 고를 여지가 사라지지 않았습니다.',
				approach: '통합 검색, 레시피 하이브리드 검색과 통합 자동완성, 클립 벡터 검색을 차례로 붙인 뒤, 검색 경로를 **`/search`와 `/search/suggestions` 둘로** 정리하고 응답을 `type`으로 구분하는 형태로 바꿨습니다. 호환이 깨지는 변경 4건은 이때 한 번에 정리했습니다.',
				result: '검색 제공자 매핑을 빠짐없는 `when`으로 두어, 새 종류를 빠뜨리면 컴파일이 막히고 등록을 빠뜨리면 스모크 테스트가 잡습니다.'
			},
			{
				title: 'Spring Boot에서 Ktor로, 바깥 동작은 그대로',
				problem: 'Spring Boot와 Modulith로 시작한 백엔드를 Ktor와 Exposed로 다시 쓰면서, API 응답과 DB 스키마, 세션처럼 **바깥에서 보이는 동작은 바꾸지 않는 것**을 목표로 했습니다.',
				approach: '기존 앱의 실제 응답 56건과 골든 JSON 24건으로 특성화 테스트를 만들었습니다. DB 마이그레이션은 바이트 단위로 같게 두고 스키마 덤프로 차이를 감시했으며, Redis 키와 TTL, 이벤트 아웃박스 형식, 환경 변수 이름까지 맞춰 전환과 롤백 어느 쪽에서도 로그인 세션이 유지되게 했습니다.',
				result: '테스트 167개를 통과한 채 전환했습니다. 전환 직후 fat jar에서 Flyway 서비스 파일이 덮어써져 마이그레이션 두 개가 조용히 빠진 문제도 찾아 빌드 설정으로 고쳤습니다.'
			}
		],
		shots: []
	},
	en: {
		lead: 'The backend of a learning service that layers playlists, reviews, recipe sharing, recommendations and unified search over short lecture clips. As the only backend developer I build the API, the data model, and **search with its embedding indexing pipeline**.',
		facts: [
			{ k: 'Period', v: '2026.06 — ongoing' },
			{ k: 'Team', v: 'PM · FE · solo backend' },
			{ k: 'Role', v: 'Backend, end to end' },
			{ k: 'Stack', v: 'Kotlin · Ktor · Exposed · Koin' },
			{ k: 'Data', v: 'PostgreSQL · pgvector · pg_trgm · Valkey' },
			{ k: 'Infra', v: 'AWS EC2 · Terraform · GitHub Actions' }
		],
		structure: {
			intro: 'Started on Spring Boot and rewritten on Ktor and Exposed; today it is a **feature-based vertical slice** layout where each feature’s domain owns its ports and infrastructure implements them.',
			items: [
				{ name: 'app/', text: 'Assembly only: registers the features and holds the architecture-rule tests.' },
				{ name: 'platform/', text: 'Database, Redis, outbox, error responses, and adapters for outside services such as embeddings and media.' },
				{ name: 'common/', text: 'The contracts every feature relies on: error format, domain events, transactions, vector and search SPIs.' },
				{ name: 'feature/', text: 'Eleven features such as account, catalog, playlist, recipe, recommendation and search. Inside, only `route → application → domain ← infrastructure` is allowed, enforced by tests.' },
				{ name: 'docugen/', text: 'A DSL that generates OpenAPI 3.1 documents from route definitions.' },
				{ name: 'search SPI', text: 'Search knows no other feature; it collects the search and suggestion providers each feature registers.' }
			]
		},
		architecture: {
			intro: 'Search runs **vector and keyword retrieval in one SQL statement** and fuses the rankings (RRF). Embeddings are filled outside the request path by a worker draining an outbox queue.',
			notes: [
				'The vector side takes HNSW candidates on the first 512 dimensions (halfvec) of a 768-dimension embedding, then re-ranks only those candidates on the full vector.',
				'The keyword side ranks by `pg_trgm` similarity. The two are combined with a `FULL OUTER JOIN` and ordered by **RRF (k = 60)**.',
				'Unified search calls the lecture, clip and recipe providers in parallel and fuses their rankings with RRF once more.',
				'If the embedding server is missing or failing, search drops to keyword-only and still answers.',
				'Index jobs are enqueued **in the same transaction** that changes the content, claimed by the worker with `FOR UPDATE SKIP LOCKED`, retried with growing gaps and parked after the fifth failure.',
				'Suggestions compare Hangul by jamo, so a syllable still being typed and initial-consonant queries both match.'
			]
		},
		cases: [
			{
				title: 'Index jobs silently stalled on every deploy',
				problem: 'If the process restarted after claiming an index job but before saving, neither the claim query nor the backfill sweep ever picked that clip up again. It stayed unindexed with no error; locally **10 of 53** clips ended up that way, and the dev server restarts on every deploy.',
				approach: '`next_attempt_at` now means one thing, "invisible until this time": the retry time for waiting jobs and a ten-minute **lease expiry** for claimed ones. One condition claims both states, a job revived by its lease still spends an attempt, and a migration freed the rows already stuck.',
				result: 'Seven lease tests were added and shown to fail when the claim condition is reverted. All 53 local clips were indexed.'
			},
			{
				title: 'Recommendations returned 500 from limit 12 up',
				problem: 'The two-stage vector search derived HNSW’s search width (`ef_search`) from the candidate count without checking pgvector’s cap of 1000. The default request (`limit=20`) became `ef_search = 1800` and failed, as did every `limit` of 12 or more.',
				approach: 'The cap lives in one place, and the fix trims **the candidate count itself** rather than `ef_search`, because lowering `ef_search` alone means more iterative scans and slower queries (p50 3.92 ms at 40 against 1.52 ms at 200). Every combination of request size 1–600 and over-fetch factor was checked to stay under the cap.',
				result: 'The bug only reproduces on a real PostgreSQL, so integration tests pin it, and they were confirmed to fail on the old code.'
			},
			{
				title: 'A third of the vector index, and what it cost',
				problem: 'At 4,096 bytes per row, the HNSW index on 768-dimension vectors would outgrow a 128 MB buffer at about 33,000 rows, a size subtitle-level indexing would reach.',
				approach: 'Embeddings moved to `halfvec` (maximum cosine-distance error 7e-5), and a two-stage search now **indexes only the first 512 dimensions** and re-ranks the candidates on all 768. On 20,000 synthetic rows, 256 dimensions reached recall@10 0.862, short of the 0.95 bar; 512 reached 0.984.',
				result: 'The index shrank to 1,366 bytes per row, pushing the memory crossover to about 98,000 rows. At 20,000 rows the two-stage search is slower (p50 7.17 ms against 1.52 ms), so recipe search, with far less data, keeps a single 768-dimension index.'
			},
			{
				title: 'Five ways in, and clips went missing',
				problem: 'Five endpoints looked like search, and the frontend’s search screen used the lecture list, so clips never appeared in results. Adding one more unified endpoint would not stop the wrong one from being picked.',
				approach: 'Unified search, recipe hybrid search with unified suggestions, and clip vector search landed in turn; then search was reduced to **`/search` and `/search/suggestions`**, with responses discriminated by `type`. The four breaking changes went in together.',
				result: 'Provider mapping is an exhaustive `when`, so a new kind that is not handled fails to compile, and a missing registration fails the smoke test.'
			},
			{
				title: 'Spring Boot to Ktor with the outside unchanged',
				problem: 'Rewriting the Spring Boot and Modulith backend on Ktor and Exposed, the goal was that **nothing visible from outside changes**: API responses, the database schema, sessions.',
				approach: 'Characterisation tests came from 56 recorded responses and 24 golden JSON files. Migrations were kept byte-for-byte with schema dumps watching for drift, and Redis keys and TTLs, the event outbox format and environment variable names all matched, so sessions survived both cut-over and rollback.',
				result: 'It switched over with 167 tests green. Right after, a fat-jar build that overwrote Flyway’s service file had silently skipped two migrations; that was found and fixed in the build configuration.'
			}
		],
		shots: []
	}
};
