export function SearchButtonList({ searchButtonList, onButtonClick }) {
	return (
		<div className="search-button-list">
			{searchButtonList.map((buttonName) => (
				<button 
					key={buttonName} 
					className="search-button"
					onClick={() => onButtonClick(buttonName)}
				>
					{buttonName}
				</button>
			))}
		</div>
	)
}
