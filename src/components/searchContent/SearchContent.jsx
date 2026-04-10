//import { useState } from "react"
import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ tabList, selectedTab, setSelectedTab, searchButtonNameList }) {

	return (
		<>
			<SearchTabList
				tabList={tabList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
			/>

			<SearchButtonList searchButtonNameList={searchButtonNameList} />
		</>
	)
}