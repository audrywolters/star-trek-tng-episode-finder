import { SearchButton } from "./SearchButton"

export function SearchButtonList({ selectedTabSearchButtonList, onButtonClick }) {
	return (
		<div className="search-button-list">
			{selectedTabSearchButtonList.map((button) => (
				<SearchButton 
					key={`${button.id}-${button.name}`}
					button={button}
					className="search-button"
					onButtonClick={onButtonClick}
				/>
			))}
		</div>
	)
}
