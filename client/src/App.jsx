import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { SearchContent } from './components/searchContent/SearchContent'
import { SelectedButtonList } from './components/selected/SelectedButtonList'
import { EpisodeList } from './components/episode/EpisodeList'
import './App.css'

function App() {

	// Holds filter (tab names) categories and their buttons from the backend
	const [searchData, setSearchData] = useState([])

	// tracks which tab is currently selected
	const [selectedTab, setSelectedTab] = useState('Character')

	// collects all the searchButtons clicked (which makes them become selectedButtons)
	// grouped by tabName
	const [selectedButtonList, setSelectedButtonList] = useState({})

	// the filtered episodes fetched from the backend
	const [episodeList, setEpisodeList] = useState([])

	// fetch all the tab and button data from backend (FilterCategoryDto and its Rows on backend)
	useEffect(() => {
		async function fetchFilters() {
			try {
				const result = await fetch('http://localhost:5000/api/filters')

				if (!result.ok) {
					throw new Error('Failed to fetch filters')
				}

				const data = await result.json()

				// rename backend properties to match the frontend data structure
				const formattedData = data.map((item) => ({
					tabName: item.name,
					searchButtons: item.rows
				}))

				setSearchData(formattedData)

				// select first tab
				if (formattedData.length > 0) {
					setSelectedTab(formattedData[0].tabName)
				}

			} catch (error) {
				console.error(error)
			}
		}

		fetchFilters()
	}, [])

	// create a list of tab names for rendering
	const tabNameList = searchData.map((data) => data.tabName)

	// find the search data object that matches the selected tab
	const selectedTabData = searchData.find(
		(data) => data.tabName === selectedTab
	)

	// get search buttons belonging to the selected tab
	const selectedTabSearchButtonList = selectedTabData?.searchButtons || []

	// transform selectedButtons (grouped by tab) into a flat list with filterType for the backend
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

	// memoize flattened selected buttons to avoid recalculating on every render
	const flatSelectedButtons = useMemo(() => {
		return buildFlatButtonList(selectedButtonList)
	}, [selectedButtonList])

	// toggle selection of a search button for the current tab
	const handleSearchButtonClick = (searchButton) => {
		if (!selectedTab) return

		// update state 
		setSelectedButtonList((prev) => {
			// get selected buttons for the currently active tab
			const currentTabButtons = prev[selectedTab] ?? []

			// toggle button selection: remove if selected, otherwise add
			const updatedTabButtons = currentTabButtons.some(b => b.id === searchButton.id)
				? currentTabButtons.filter(b => b.id !== searchButton.id)
				: [...currentTabButtons, searchButton]

			// return updated state with the modified button list for the current tab
			return {
				...prev,
				[selectedTab]: updatedTabButtons
			}
		})
	}

	// remove a button from the selected list for the given tab
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

	// fetch episodes matching the selectedButtuons (filerts on backend)
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
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				selectedButtonList={flatSelectedButtons} // selected buttons used for UI selection state
				onButtonClick={handleSearchButtonClick}
			/>

			<div className="split-screen">
				<SelectedButtonList
					selectedButtonList={flatSelectedButtons}
					onClickRemove={handleRemoveSelectedButton}
				/>
				<EpisodeList 
					episodeList={episodeList}
					selectedButtonList={flatSelectedButtons} // used to show message if nothing is selected
				/>
			</div>
		</div>
	)
}

export default App
