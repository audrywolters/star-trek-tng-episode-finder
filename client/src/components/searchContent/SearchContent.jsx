import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ 
	tabList, 
	selectedTab, 
	setSelectedTab, 
	selectedTabSearchButtonList, 
	selectedButtonList, // to show if a search button is selected
	tabName, // to show if a search button is selected
	onButtonClick 
}) {

	return (
		<>
			<SearchTabList
				tabList={tabList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
			/>

			<SearchButtonList 
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				selectedButtonList={selectedButtonList} // to show if a search button is selected
				tabName={tabName} // to show if a search button is selected
				onButtonClick={onButtonClick} 
			/>
		</>
	)
}