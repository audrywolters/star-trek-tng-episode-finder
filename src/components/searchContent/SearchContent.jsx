//import { useState } from "react"
import { SearchTabList } from "./SearchTabList"
import { SearchButtonList } from "./SearchButtonList"
import './SearchContent.css'

export function SearchContent({ tabs, selectedTab, setSelectedTab, buttons }) {

	return (
		<>
			<SearchTabList
				tabs={tabs}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>

			<SearchButtonList buttons={buttons} />
		</>
	)
}