import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ tabList, selectedTab, setSelectedTab, searchButtonList, onButtonClick }) {

	return (
		<>
			<SearchTabList
				tabList={tabList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
			/>

			<SearchButtonList 
				searchButtonList={searchButtonList}
				onButtonClick={onButtonClick} 
			/>
		</>
	)
}