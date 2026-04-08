export function SearchButtonList({ buttons }) {
	return (
		<div className="search-button-list">
			{buttons.map((button) => (
				<button key={button} className="search-button">
					{button}
				</button>
			))}
		</div>
	)
}
