import React from 'react'
import EntitiesList from 'components/EntitiesList/EntitiesList'
import './App.scss'

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <EntitiesList />
      </header>
    </div>
  )
}

export default App
