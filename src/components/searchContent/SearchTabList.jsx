export function SearchTabList({tabList, selectedTab, setSelectedTab}) {

	return (
		<div className="tab-list">
			{tabList.map((tab) => (
				<div	
					key={tab}
					className={`tab ${selectedTab === tab ? "active" : ""}`}
					onClick={() => setSelectedTab(tab)} // set the seletedTab state in App.jsx
				>
					{tab}
				</div>
			))}
		</div>
	)
}