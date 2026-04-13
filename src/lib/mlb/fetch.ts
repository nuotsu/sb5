export default async function fetchMLB<T>(endpoint: string, params?: Record<string, string>) {
	const url = new URL(endpoint, 'https://statsapi.mlb.com')

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.set(key, value)
		})
	}

	const response = await fetch(url)

	return (await response.json()) as T
}
