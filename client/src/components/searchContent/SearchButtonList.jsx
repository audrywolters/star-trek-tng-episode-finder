import { SearchButton } from "./SearchButton"

export function SearchButtonList({ 
	selectedTabSearchButtonList, 
	selectedButtonList, // used to determine selected state of buttons (by name + tab)
	selectedTab,
	onButtonClick 
}) {
	return (
		<div className="search-button-list">
			{selectedTabSearchButtonList.map((button) => (
				<SearchButton 
					key={`${button.id}-${button.name}`}
					button={button}
					className="search-button"
					isSelected={selectedButtonList[selectedTab]?.some(
						(item) => item.id === button.id
					)}
					onButtonClick={onButtonClick}
				/>
			))}
		</div>
	)
}
