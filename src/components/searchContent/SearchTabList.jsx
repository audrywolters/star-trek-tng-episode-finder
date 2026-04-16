import { SearchTab } from "./SearchTab";

export function SearchTabList({tabList, selectedTab, setSelectedTab}) {

	return (
		<div className="tab-list">
			{tabList.map((tab) => (
				<SearchTab
					key={tab}
					tab={tab}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>

			))}
		</div>
	)
}