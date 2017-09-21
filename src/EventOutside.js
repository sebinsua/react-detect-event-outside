// @flow

import React, { Component } from 'react'
import debounce from 'debounce'

import type { Node } from 'react'

type ValidEvent = 'click' | 'touchstart' | 'focusin' | 'focus'

type EventOutsideProps = {
  events: ValidEvent[],
  onEventOutside: (event: Event, relatedElement?: HTMLElement) => any,
  children: Node
}

const HANDLE_TIMEOUT = 200

class EventOutside extends Component<EventOutsideProps> {
  container: ?HTMLElement

  static defaultProps = {
    events: ['click', 'touchstart', 'focusin', 'focus']
  }

  componentDidMount() {
    const { events = [] } = this.props
    events.forEach(eventName =>
      document.addEventListener(eventName, this.handleEvent, true)
    )
  }

  componentWillUnmount() {
    const { events = [] } = this.props
    events.forEach(eventName =>
      document.removeEventListener(eventName, this.handleEvent, true)
    )
  }

  getContainer = (ref: ?HTMLElement) => (this.container = ref)

  handleEvent = debounce((event: Event) => {
    const { onEventOutside } = this.props
    const containerElement = this.container

    if (containerElement) {
      setImmediate(() => {
        let relatedElement = event.target
        if (event.type === 'focus') {
          relatedElement = document.activeElement
        }

        if (relatedElement instanceof HTMLElement) {
          const isWithinContainer = containerElement.contains(relatedElement)
          if (!isWithinContainer) {
            onEventOutside(event, relatedElement)
          }
        }
      })
    }
  }, HANDLE_TIMEOUT)

  render() {
    const { children, events, onEventOutside, ...props } = this.props
    return (
      <div {...props} ref={this.getContainer}>
        {children}
      </div>
    )
  }
}

export type { ValidEvent, EventOutsideProps }
export default EventOutside
