import React, { Component } from 'react'
import { withEventOutside } from 'react-detect-event-outside'

class Handler extends Component {
  handleEventOutside = (evt, el) =>
    console.log('Handler: event happened outside', evt, el)

  render() {
    const { children } = this.props
    return <div className="App-footer">{children}</div>
  }
}

export default withEventOutside()(Handler)
