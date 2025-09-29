export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	language: string | null;
	topics: string[];
	created_at: string;
	updated_at: string;
	pushed_at: string;
	fork?: boolean;
}

const GITHUB_USERNAME = 'mooner1022';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchTopRepos(limit: number = 6): Promise<GitHubRepo[]> {
	try {
		const response = await fetch(
			`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
		);

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repos: GitHubRepo[] = await response.json();

		// Filter out forks and sort by stars, then take top N
		return repos
			.filter(repo => !repo.fork)
			.sort((a, b) => b.stargazers_count - a.stargazers_count)
			.slice(0, limit);
	} catch (error) {
		console.error('Failed to fetch GitHub repos:', error);
		// Return mock data as fallback
		return getMockRepos().slice(0, limit);
	}
}

function getMockRepos(): GitHubRepo[] {
	return [
		{
			id: 1,
			name: 'awesome-project',
			full_name: 'mooner1022/awesome-project',
			description: 'Foobar FizzFuzz',
			html_url: 'https://github.com/mooner1022/awesome-project',
			stargazers_count: 245,
			language: 'UmmLang',
			topics: ['dummy', 'ummlang', 'api'],
			created_at: '2023-01-15T10:00:00Z',
			updated_at: '2024-03-20T15:30:00Z',
			pushed_at: '2024-03-20T15:30:00Z'
		},
	];
}