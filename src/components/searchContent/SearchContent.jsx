import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ tabList, selectedTab, setSelectedTab, selectedTabSearchButtonList, onButtonClick }) {

	return (
		<>
			<SearchTabList
				tabList={tabList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
			/>

			<SearchButtonList 
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				selectedTab={selectedTab} // sending this to make a better key for the searchButtonList
				onButtonClick={onButtonClick} 
			/>
		</>
	)
}