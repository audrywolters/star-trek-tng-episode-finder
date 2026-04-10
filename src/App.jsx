import { useState } from 'react'
import { Header } from './components/Header'
import { SearchContent } from './components/searchContent/SearchContent' 
import { SelectedList } from './components/selected/SelectedList'
import { EpisodeList } from './components/episode/EpisodeList'
import './App.css'

function App() {

  // mock data
  const searchData = [
    { tabName: "Character", searchButtonNameList: ["Picard", "Crusher"] },
    { tabName: "Genre", searchButtonNameList: ["Action", "Drama"] }
  ]	

  // state
  const [selectedTab, setSelectedTab] = useState("Character")

  // manipulate the tabs and their buttons
  const tabNameList = searchData.map(data => data.tabName)
  const selectedTabData = searchData.find(data => data.tabName === selectedTab)
  const selectedTabSearchButtonNameList = selectedTabData?.searchButtonNameList || []

  

  return (
      <div className="grid-parent">
        <Header />

        <SearchContent 
          tabList={tabNameList} 
          selectedTab={selectedTab} // state 
          setSelectedTab={setSelectedTab} // state
          searchButtonNameList={selectedTabSearchButtonNameList} />


        <div className="split-screen">
          <SelectedList />
          <EpisodeList />
        </div>
      </div>
  )
}

export default App
