import './Episode.css'

export function EpisodeList({ episodeList, selectedButtonList }) {
	return (
		<div className="episode-list">
			<h2>Episodes</h2>

			{selectedButtonList.length === 0 ? (
				<div>Select some buttons from the tabs to find episodes.</div>
			) : (
				episodeList.length === 0 ? (
					<div>No episodes found. Try removing some buttons.</div>
			) : (
				episodeList.map((episode) => (
					<div key={episode.id}>
						<h2>{episode.title}</h2>
						<h3>Season {episode.season} Episode {episode.episodeNumber}</h3>
						<p>{episode.description}</p>
					</div>
				))
			))}
		</div>
	)
}