import React from 'react'
import logo from './logo.svg'
import './App.css'

import EventOutside from 'react-detect-event-outside'

const onEvent = (evt, el) => console.log('event happened outside', evt, el)

const App = () => (
  <div className="App">
    <EventOutside onEventOutside={onEvent}>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Inside</h2>
        <input type="text" />
      </div>
    </EventOutside>
    <div className="App-intro">
      <h2>Outside</h2>
      <input type="text" />
    </div>
  </div>
)

export default App
