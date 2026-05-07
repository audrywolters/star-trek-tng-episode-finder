import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { SearchContent } from './components/searchContent/SearchContent'
import { SelectedButtonList } from './components/selected/SelectedButtonList'
import { EpisodeList } from './components/episode/EpisodeList'
import './App.css'

function App() {
	// mock data that would be coming from backend
	// it is structured data that is all the stuff used to search for an episode
	const searchData = [
		{
			tabName: 'Character',
			backendTable: 'Character',
			searchButtonList: [
				{ id: 1, name: 'Picard' },
				{ id: 2, name: 'Crusher' }
			]
		},
		{
			tabName: 'Genre',
			backendTable: 'Genre',
			searchButtonList: [
				{ id: 1, name: 'Action' },
				{ id: 2, name: 'Problem Solving' }
			]
		}
	]

	// tracks which tab is currently selected (it is set in SearchTabList.jsx)
	const [selectedTab, setSelectedTab] = useState('Character')

	// collects all the search buttons clicked
	// and keeps the tabname/backend table name tied to it
	const [selectedButtonList, setSelectedButtonList] = useState({})

	// the filtered episodes fetched from the backend
	const [episodeList, setEpisodeList] = useState([])

	// find all the tab names from the backend
	const tabNameList = searchData.map((data) => data.tabName)

	// grabs all the data linked to the selected tab
	// like tabName, earchButtonNameList
	// so we can keep track of all the data that is related to eachother
	// like tab to buttons relationship and for backend queries
	const selectedTabData = searchData.find(
		(data) => data.tabName === selectedTab
	)

	// by the selcted tab, display the buttons that are under the tab category
	const selectedTabSearchButtonList = selectedTabData?.searchButtonList || []

	const buildFlatButtonList = (selectedButtons) => {
		return Object.entries(selectedButtons).flatMap(([tabName, items]) =>
			items.map((item) => ({
				id: item.id,
				name: item.name,
				filterType: tabName
			}))
		)
	}

	// reuse the same array unless selectedButtonList changes
	const flatSelectedButtons = useMemo(() => {
		return buildFlatButtonList(selectedButtonList)
	}, [selectedButtonList])

	// click a search button
	const handleSearchButtonClick = (searchButton) => {
		const tabName = selectedTabData?.tabName
		if (!tabName) return

		setSelectedButtonList((prev) => {
			const current = prev[tabName] || []

			const exists = current.some((item) => item.id === searchButton.id)

			const updated = exists
				? current.filter((item) => item.id !== searchButton.id)
				: [...current, { id: searchButton.id, name: searchButton.name }]

			return {
				...prev,
				[tabName]: updated
			}
		})
	}

	// the selectedButton that was clicked to be removed
	// will pass it's ID and backend table data
	// if the data doesn't match other buttons, they will be kept
	// if it matches, it will be removed
	const handleRemoveSelectedButton = (id, tabName) => {

		setSelectedButtonList((prev) => {
			const current = prev[tabName] || []

			const updatedSelectedButtons = current.filter((item) => item.id !== id)

			return {
				...prev,
				[tabName]: updatedSelectedButtons
			}
		})
	}

	// fetch the episodes that match the selected SearchButtons
	useEffect(() => {
		async function fetchFilteredEpisodeList() {
			try {

				const result = await fetch('http://localhost:5000/api/episodes/search', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(flatSelectedButtons)
				})

				if (!result.ok) {
					const text = await result.text()
					console.error("Backend error: ", text)
					return
				}
				
				const data = await result.json()
				setEpisodeList(data)
			} catch (error) {
				console.error(error)
			}
		}

		fetchFilteredEpisodeList()
	}, [flatSelectedButtons])

	return (
		<div className="grid-parent">
			<Header />

			<SearchContent
				tabList={tabNameList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				selectedButtonList={flatSelectedButtons} // to show if a search button is selected
				tabName={selectedTabData?.tabName} // to show if a search button is selected
				onButtonClick={handleSearchButtonClick}
			/>

			<div className="split-screen">
				<SelectedButtonList
					selectedButtonList={flatSelectedButtons} // state
					onClickRemove={handleRemoveSelectedButton}
				/>
				<EpisodeList 
					episodeList={episodeList}
					selectedButtonList={flatSelectedButtons}
				/>
			</div>
		</div>
	)
}

export default App
