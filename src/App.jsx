import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { SearchContent } from './components/searchContent/SearchContent' 
import { SelectedList } from './components/selected/SelectedList'
import { EpisodeList } from './components/episode/EpisodeList'
import './App.css'

function App() {

  // mock data
  const searchData = [
    { tabName: "Character", searchButtonNameList: ["Picard", "Crusher"] },
    { tabName: "Genre", searchButtonNameList: ["Action", "Problem Solving"] }
  ]	

  // state
  const [selectedTab, setSelectedTab] = useState("Character")
  const [selectedButtonList, setSelectedButtonList] = useState({
    characters: [],
    genres: []
    // aliens
    // misc
  })

  // manipulate the tabs and their buttons
  const tabNameList = searchData.map(data => data.tabName)
  const selectedTabData = searchData.find(data => data.tabName === selectedTab)
  const selectedTabSearchButtonNameList = selectedTabData?.searchButtonNameList || []

  // when clicking on a search button, add it to the selectedButtonList state
  // keep the data structure ready for the backend (to search by column)
  const tabMapping = {
    Character: 'characters',
    Genre: 'genres'
  }

  const handleSearchButtonClick = (searchButtonName) => {
    const selectedKey = tabMapping[selectedTab]

    if (selectedKey) {
      setSelectedButtonList(prev => {
        // check for duplicates
        if(!prev[selectedKey].includes(searchButtonName)) {
          return {
            // add to list
            ...prev,
            [selectedKey]: [...prev[selectedKey], searchButtonName]
          }
        }
        return prev
      })
    }
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
          searchButtonNameList={selectedTabSearchButtonNameList}
          onButtonClick={handleSearchButtonClick} />


        <div className="split-screen">
          <SelectedList 
            selectedButtonList={selectedButtonList}
          />
          <EpisodeList />
        </div>
      </div>
  )
}

export default App
