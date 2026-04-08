export function SearchTabList({tabs, selectedTab, setSelectedTab}) {

	return (
		<div className="tab-list">
			{tabs.map((tab) => (
				<div	
					key={tab}
					className={`tab ${selectedTab === tab ? "active" : ""}`}
					onClick={() => setSelectedTab(tab)}
				>
					{tab}
				</div>
			))}
		</div>
	)
}