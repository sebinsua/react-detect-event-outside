import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EventOutside extends Component {
  static propTypes = {
    onClickOutside: PropTypes.func.isRequired
  }

  getContainer = ref => {
    this.container = ref
  }

  componentDidMount() {
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true)
  }

  handle = e => {
    const { onClickOutside } = this.props
    const el = this.container
    if (!el.contains(e.target)) onClickOutside(e)
  }

  render() {
    const { children, onClickOutside, ...props } = this.props
    return (
      <div {...props} ref={this.getContainer}>
        {children}
      </div>
    )
  }
}

export default EventOutside
