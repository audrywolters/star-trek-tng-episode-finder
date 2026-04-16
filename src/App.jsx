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
      searchButtonNameList: ['Picard', 'Crusher']
    },
		{ 
      tabName: 'Genre', 
      backendTable: 'genres',
      searchButtonNameList: ['Action', 'Problem Solving'] }
	]

  // tracks which tab is currently selected (it is set in SearchTabList.jsx)
	const [selectedTab, setSelectedTab] = useState('Character')

  // collects all the search buttons clicked 
  // and keeps the tabname/backend table name tied to it
	const [selectedButtonList, setSelectedButtonList] = useState([])

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
	const selectedTabSearchButtonList =
		selectedTabData?.searchButtonNameList || []

  // click a search button
	const handleSearchButtonClick = (searchButtonName) => {
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
				(item) => item.name === searchButtonName && item.backendTable === selectedBackendTable
			)

      // don't allow a duplicate button
			if (alreadyExists) return prev

			// if not already selected, add to state
      // and form the object so we may track the data for the DB
			return [...prev, { name: searchButtonName, backendTable: selectedBackendTable }]
		})
	}

	// for testing only
	useEffect(() => {
		console.log(selectedButtonList)
	}, [selectedButtonList])

	return (
		<div className="grid-parent">
			<Header />

			<SearchContent
				tabList={tabNameList}
				selectedTab={selectedTab} // state
				setSelectedTab={setSelectedTab} // state
				selectedTabSearchButtonList={selectedTabSearchButtonList}
				onButtonClick={handleSearchButtonClick}
			/> 

			<div className="split-screen">
				<SelectedButtonList 
          selectedButtonList={selectedButtonList} // state
        />
				<EpisodeList />
			</div>
		</div>
	)
}

export default App
