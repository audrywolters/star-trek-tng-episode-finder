export function SearchButtonList({ searchButtonNameList, onButtonClick }) {
	return (
		<div className="search-button-list">
			{searchButtonNameList.map((buttonName) => (
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
