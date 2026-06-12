import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { SearchContent } from './components/searchContent/SearchContent'
import { SelectedButtonList } from './components/selected/SelectedButtonList'
import { EpisodeList } from './components/episode/EpisodeList'
import './App.css'

function App() {

	// hold the tab and button names from the backend
	const [searchData, setSearchData] = useState([])

	// tracks which tab is currently selected (it is set in SearchTabList.jsx)
	const [selectedTab, setSelectedTab] = useState('Character')

	// collects all the search buttons clicked
	// and keeps the tabname tied to it
	const [selectedButtonList, setSelectedButtonList] = useState({})

	// the filtered episodes fetched from the backend
	const [episodeList, setEpisodeList] = useState([])

	// get all the tab and button data from backend
	useEffect(() => {
		async function fetchFilters() {
			try {
				const result = await fetch('http://localhost:5000/api/filters')

				if (!result.ok) {
					throw new Error('Failed to fetch filters')
				}

				const data = await result.json()

				// update the data names for easier reading on the frontend
				const formattedData = data.map((item) => ({
					tabName: item.name,
					searchButtons: item.rows
				}))

				setSearchData(formattedData)

				// set first tab automatically
				if (formattedData.length > 0) {
					setSelectedTab(formattedData[0].tabName)
				}

			} catch (error) {
				console.error(error)
			}
		}

		fetchFilters()
	}, [])

	// set all the tab names
	const tabNameList = searchData.map((data) => data.tabName)

	// keep track of what tab is selected
	const selectedTabData = searchData.find(
		(data) => data.tabName === selectedTab
	)

	// by the selcted tab, display the buttons that are under the tab category
	const selectedTabSearchButtonList = selectedTabData?.searchButtons || []

	// restructure the data for the backend
	const buildFlatButtonList = (selectedButtons) => {
		return Object.entries(selectedButtons).flatMap(
			([tabName, selectedButtonsForTab]) =>
				selectedButtonsForTab.map((item) => ({
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

	// handle search button toggle
	const handleSearchButtonClick = (searchButton) => {
		if (!selectedTab) return

		// update state based on latest previous state
		setSelectedButtonList((prev) => {
			// get all the selected buttons
			const currentTabButtons = prev[selectedTab] ?? []

			const updatedTabButtons = currentTabButtons.some(b => b.id === searchButton.id)
				// remove button if already selected (toggle)
				? currentTabButtons.filter(b => b.id !== searchButton.id)
				// add bugtton if not already selected (toggle)
				: [...currentTabButtons, searchButton]

			return {
				...prev,
				[selectedTab]: updatedTabButtons
			}
		})
	}

	// update state when user clicks a selected button to remove it from the filters
	const handleRemoveSelectedButton = (id, tabName) => {

		setSelectedButtonList((prev) => {
			const current = prev[tabName] || []

			const updatedSelectedButtons = current.filter(
				(selectedButton) => selectedButton.id !== id
			)

			return {
				...prev,
				[tabName]: updatedSelectedButtons
			}
		})
	}

	// fetch the episodes that match the selected SearchButtons
	useEffect(() => {

		// if there are no buttons selected, do not fetch episodes
		if (flatSelectedButtons.length === 0) {
			return
		}

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

				console.log('fetch filtered episodes')
				console.log(data)

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
