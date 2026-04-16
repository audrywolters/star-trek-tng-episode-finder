import { SearchButton } from "./SearchButton"

export function SearchButtonList({ selectedTabSearchButtonList, selectedTab, onButtonClick }) {
	return (
		<div className="search-button-list">
			{selectedTabSearchButtonList.map((buttonName) => (
				<SearchButton 
					key={`${buttonName}-${selectedTab}`}
					buttonName={buttonName}
					className="search-button"
					onButtonClick={onButtonClick}
				/>
			))}
		</div>
	)
}
