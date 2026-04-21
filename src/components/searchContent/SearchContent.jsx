import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ 
	tabList, 
	selectedTab, 
	setSelectedTab, 
	selectedTabSearchButtonList, 
	selectedButtonList, // to disable already selected search buttons
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
				selectedButtonList={selectedButtonList} // to disable already selected search buttons
				onButtonClick={onButtonClick} 
			/>
		</>
	)
}