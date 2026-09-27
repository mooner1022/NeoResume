import type { Lang, ProjectDetail } from '../types';

// Written from amoa-team/amoa-backend (private, team of four). Only the parts he wrote are described as his;
// teammates are not named. Cases stay empty until he decides what the team is comfortable publishing.
export const amoa: Record<Lang, ProjectDetail> = {
	ko: {
		lead: '짧은 강의 클립 위에 플레이리스트, 후기, 레시피 공유, 추천, 통합 검색을 얹은 학습 서비스의 백엔드입니다. 4인 팀에서 백엔드를 맡아 **검색과 임베딩 색인 파이프라인**을 만들었습니다.',
		facts: [
			{ k: 'Period', v: '2026.06 — 진행 중' },
			{ k: 'Team', v: '4인 · PM · FE · BE 2' },
			{ k: 'Role', v: '백엔드 · 검색 · 색인 파이프라인' },
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
		cases: [],
		shots: []
	},
	en: {
		lead: 'The backend of a learning service that layers playlists, reviews, recipe sharing, recommendations and unified search over short lecture clips. On a team of four I worked on the backend and built **search and the embedding indexing pipeline**.',
		facts: [
			{ k: 'Period', v: '2026.06 — ongoing' },
			{ k: 'Team', v: '4 · PM · FE · BE ×2' },
			{ k: 'Role', v: 'Backend · search · indexing pipeline' },
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
		cases: [],
		shots: []
	}
};
