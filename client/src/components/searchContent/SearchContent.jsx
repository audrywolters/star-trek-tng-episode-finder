import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ 
	tabList, 
	selectedTab, 
	setSelectedTab, 
	selectedTabSearchButtonList, 
	selectedButtonList, // selected buttons used for UI selection state
	onButtonClick 
}) {

	return (
		<>
			<SearchTabList
				tabList={tabList}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>

			<SearchButtonList 
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				selectedButtonList={selectedButtonList} // used to detrmine selected state of buttons
				selectedTab={selectedTab}
				onButtonClick={onButtonClick} 
			/>
		</>
	)
}