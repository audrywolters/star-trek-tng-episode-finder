export function SearchButtonList({ searchButtonNameList }) {
	return (
		<div className="search-button-list">
			{searchButtonNameList.map((buttonName) => (
				<button key={buttonName} className="search-button">
					{buttonName}
				</button>
			))}
		</div>
	)
}
