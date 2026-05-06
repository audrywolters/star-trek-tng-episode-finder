import { useEffect, useState } from 'react'
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
			backendTable: 'characters',
			searchButtonList: [
				{ id: 1, name: 'Picard' },
				{ id: 2, name: 'Crusher' }
			]
		},
		{
			tabName: 'Genre',
			backendTable: 'genres',
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
	const [selectedButtonList, setSelectedButtonList] = useState([])

	// the filtered episodes fetched from the backend
	const [episodeList, setEpisodeList] = useState([])

	// find all the tab names from the backend
	const tabNameList = searchData.map((data) => data.tabName)

	// grabs all the data linked to the selected tab
	// like tabName, backendTable, searchButtonNameList
	// so we can keep track of all the data that is related to eachother
	// like tab to buttons relationship and for backend queries
	const selectedTabData = searchData.find(
		(data) => data.tabName === selectedTab
	)

	// by the selcted tab, display the buttons that are under the tab category
	const selectedTabSearchButtonList = selectedTabData?.searchButtonList || []

	// click a search button
	const handleSearchButtonClick = (searchButton) => {
		const selectedBackendTable = selectedTabData?.backendTable

		// backout if there is no table/category/tabName
		if (!selectedBackendTable) return

		// update state
		// this state will be an object with the button name and it's tab category along with it
		// we will need to tie the 2 together so we can query the DB
		// while maintaining the order the buttons have been clicked
		setSelectedButtonList((prev) => {
			// check for duplicates
			const alreadyExists = prev.some(
				(item) =>
					item.name === searchButton.name &&
					item.backendTable === selectedBackendTable
			)

			// toggle selecte/not selected for SearchButton
			if (alreadyExists) {
				return prev.filter(
					(item) =>
						item.name !== searchButton.name ||
						item.backendTable !== selectedBackendTable
				)
			}

			// if not already selected, add to state
			// and form the object so we may track the data for the DB
			return [
				...prev,
				{ 
					id: searchButton.id,
					name: searchButton.name,
					type: selectedBackendTable.tabName
				}
			]
		})
	}

	// the selectedButton that was clicked to be removed
	// will pass it's ID and backend table data
	// if the data doesn't match other buttons, they will be kept
	// if it matches, it will be removed
	const handleRemoveSelectedButton = (id, type) => {
		setSelectedButtonList((prev) => {
			return prev.filter(
				(selectedButton) =>
					selectedButton.id !== id ||
					selectedButton.type !== type
			)
		})
	}

	// fetch the episodes that match the selected SearchButtons
	useEffect(() => {
		async function fetchFilteredEpisodeList() {
			try {
				const result = await fetch('http://localhost:5000/api/episodes/search', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						filters: selectedButtonList
					})
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
	}, [selectedButtonList])

	return (
		<div className="grid-parent">
			<Header />

			<SearchContent
				tabList={tabNameList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				selectedButtonList={selectedButtonList} // to show if a search button is selected
				backendTable={selectedTabData?.backendTable} // to show if a search button is selected
				onButtonClick={handleSearchButtonClick}
			/>

			<div className="split-screen">
				<SelectedButtonList
					selectedButtonList={selectedButtonList} // state
					onClickRemove={handleRemoveSelectedButton}
				/>
				<EpisodeList 
					episodeList={episodeList}
					selectedButtonList={selectedButtonList}
				/>
			</div>
		</div>
	)
}

export default App
