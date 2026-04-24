export async function fetchEpisodeList() {
	const res = await fetch('http://localhost:5000/api/episodes')

	if (!res.ok) {
		throw new Error('Failed to fetch episodes')
	}

	return res.json()
}