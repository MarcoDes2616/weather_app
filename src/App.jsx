import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Clock from './components/Clock'


function App() {
  

  return (
    <div className="App">
      <WeatherCard />
    </div>
  )
}

export default App
