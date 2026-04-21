import { SearchButton } from "./SearchButton"

export function SearchButtonList({ 
	selectedTabSearchButtonList, 
	selectedButtonList, // to disable already selected search buttons
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
						(item) => item.name === button.name &
						item.backendTable === item.backendTable
					)}
					onButtonClick={onButtonClick}
				/>
			))}
		</div>
	)
}
