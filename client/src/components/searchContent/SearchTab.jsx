export function SearchTab({tab, selectedTab, setSelectedTab}) {
	return (
		<div
			className={`tab ${selectedTab === tab ? 'active' : ''}`}
			onClick={() => setSelectedTab(tab)} // set the seletedTab state in App.jsx
		>
			{tab}
		</div>
	)
}
