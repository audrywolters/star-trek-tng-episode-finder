import { SearchButton } from "./SearchButton"

export function SearchButtonList({ 
	selectedTabSearchButtonList, 
	selectedButtonList, // to show if a search button is selected
	tabName, // to show if a search button is selected
	onButtonClick 
}) {
	return (
		<div className="search-button-list">
			{selectedTabSearchButtonList.map((button) => (
				<SearchButton 
					key={`${button.id}-${button.name}`}
					button={button}
					className="search-button"
					isSelected={selectedButtonList.some(
						(item) => item.name === button.name &&
						item.filterType === tabName
					)}
					onButtonClick={onButtonClick}
				/>
			))}
		</div>
	)
}
