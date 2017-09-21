import React from 'react'
import EventOutside from 'react-detect-event-outside'

import Handler from './Handler'

import logo from './logo.svg'
import './App.css'

const onEvent = (evt, el) => console.log('event happened outside', evt, el)

const App = () => (
  <div className="App">
    <EventOutside onEventOutside={onEvent}>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Inside A</h2>
        <input type="text" />
      </div>
    </EventOutside>
    <div className="App-intro">
      <h2>Outside A & B</h2>
      <input type="text" />
    </div>
    <Handler>
      <h2>Inside B</h2>
      <input type="text" />
    </Handler>
  </div>
)

export default App
