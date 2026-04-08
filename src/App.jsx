import { useState } from 'react'
import { Header } from './components/Header'
import { SearchContent } from './components/searchContent/SearchContent' 
import { SelectedList } from './components/selected/SelectedList'
import { EpisodeList } from './components/episode/EpisodeList'
import './App.css'

function App() {

  const data = [
    { name: "Character", buttons: ["Picard", "Crusher"] },
    { name: "Genre", buttons: ["Action", "Drama"] }
  ]	

  const [selectedTab, setSelectedTab] = useState("Character")

  const tabs = data.map(item => item.name)
  const selected = data.find(item => item.name === selectedTab)
  const buttons = selected?.buttons || []

  return (
      <div className="grid-parent">
        <Header />

        <SearchContent 
          tabs={tabs} 
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab}
          buttons={buttons} />


        <div className="split-screen">
          <SelectedList />
          <EpisodeList />
        </div>
      </div>
  )
}

export default App
