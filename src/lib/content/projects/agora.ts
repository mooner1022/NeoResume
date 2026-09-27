import type { Lang, ProjectDetail } from '../types';

// Written from mooner1022/AGORA-frontend and the package layout of the deployed backend build; the backend
// source was not available, so only its structure is described. No client details.
export const agora: Record<Lang, ProjectDetail> = {
	ko: {
		lead: '안건을 올리면 역할이 다른 LLM 에이전트들이 라운드마다 토론해, **결론과 근거, 조건, 남은 리스크**를 담은 보고서를 내는 의사결정 도구입니다.',
		facts: [
			{ k: 'Period', v: '2026' },
			{ k: 'Role', v: '설계 · 백엔드 · 프론트엔드' },
			{ k: 'Backend', v: 'Kotlin · Ktor · Exposed · Koin' },
			{ k: 'Frontend', v: 'SvelteKit · Svelte 5 · Tailwind' },
			{ k: 'Grounding', v: 'SearXNG · Trafilatura' },
			{ k: 'Agents', v: 'CTO · CCO/CMO · 의사결정 매니저' }
		],
		structure: {
			intro: 'Ktor 백엔드, SvelteKit 프론트엔드, 웹 본문을 뽑는 추출 서비스로 되어 있습니다. LLM 호출은 Claude, Gemini, OpenAI 호환 API를 같은 방식으로 다루는 자체 클라이언트 라이브러리를 씁니다.',
			items: [
				{ name: 'orchestration/', text: '안건 진행을 맡는 오케스트레이터, 맥락 조립, 토론 이벤트 버스, 역할별 프롬프트.' },
				{ name: 'nexus/', text: '웹 그라운딩. SearXNG로 검색하고 추출 서비스로 본문을 가져와 에이전트에게 도구로 줍니다.' },
				{ name: 'service/pdf', text: '첨부한 PDF의 본문을 뽑고 토큰 수를 미리 셉니다.' },
				{ name: 'extractor', text: 'FastAPI와 Trafilatura로 URL 본문을 마크다운과 메타데이터로 바꾸는 내부 서비스.' },
				{ name: 'frontend', text: '안건 작성, 토론 실시간 보기, 보고서, 역할별 프롬프트와 모델 설정, 토큰 사용량 통계.' },
				{ name: 'auth', text: '패스키(WebAuthn)와 TOTP 로그인.' }
			]
		},
		architecture: {
			intro: '토론은 서버에서 라운드 단위로 돌고, 발언과 도구 호출이 **SSE로** 프론트엔드에 흘러갑니다. 에이전트는 필요할 때 웹 검색 도구를 불러 근거를 가져옵니다.',
			notes: [
				'역할은 CTO, CCO/CMO, 의사결정 매니저, 그리고 요약을 맡는 작은 모델 넷입니다. 역할마다 시스템 프롬프트와 모델을 따로 바꿀 수 있습니다.',
				'안건마다 최대 라운드, 토큰 예산, 관점별 가중치를 정하고 PDF를 붙일 수 있습니다.',
				'프론트엔드는 fetch 스트림을 직접 읽어 발언, 도구 호출 시작과 끝, 검색 결과를 차례로 그립니다.',
				'보고서에는 결론, 신뢰도, 핵심 근거, 조건, 남은 리스크, 다시 검토할 조건이 담깁니다.'
			]
		},
		cases: [],
		shots: []
	},
	en: {
		lead: 'A decision tool: submit an agenda and LLM agents with different roles debate it round by round, then write a report with **the conclusion, its grounds, conditions and remaining risks**.',
		facts: [
			{ k: 'Period', v: '2026' },
			{ k: 'Role', v: 'Design · backend · frontend' },
			{ k: 'Backend', v: 'Kotlin · Ktor · Exposed · Koin' },
			{ k: 'Frontend', v: 'SvelteKit · Svelte 5 · Tailwind' },
			{ k: 'Grounding', v: 'SearXNG · Trafilatura' },
			{ k: 'Agents', v: 'CTO · CCO/CMO · Decision manager' }
		],
		structure: {
			intro: 'A Ktor backend, a SvelteKit frontend and an extraction service for web pages. LLM calls go through an in-house client library that treats Claude, Gemini and OpenAI-compatible APIs the same way.',
			items: [
				{ name: 'orchestration/', text: 'The orchestrator that runs an agenda, context assembly, the discussion event bus and per-role prompts.' },
				{ name: 'nexus/', text: 'Web grounding: searches with SearXNG, fetches page text through the extractor and hands both to the agents as tools.' },
				{ name: 'service/pdf', text: 'Extracts text from attached PDFs and estimates their token count up front.' },
				{ name: 'extractor', text: 'An internal FastAPI service that turns a URL into Markdown and metadata with Trafilatura.' },
				{ name: 'frontend', text: 'Writing agendas, watching the debate live, reports, per-role prompt and model settings, token usage stats.' },
				{ name: 'auth', text: 'Passkey (WebAuthn) and TOTP sign-in.' }
			]
		},
		architecture: {
			intro: 'The debate runs on the server round by round, and every statement and tool call streams to the frontend **over SSE**. Agents call a web search tool when they need grounds.',
			notes: [
				'Four roles: CTO, CCO/CMO, a decision manager, and a small model for summaries. Each role’s system prompt and model can be changed.',
				'Each agenda sets its maximum rounds, a token budget and per-perspective weights, and can carry a PDF.',
				'The frontend reads the fetch stream itself and renders statements, tool calls starting and finishing, and search results as they arrive.',
				'The report holds the conclusion, confidence, key grounds, conditions, remaining risks and what would trigger a review.'
			]
		},
		cases: [],
		shots: []
	}
};
