// @flow

import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import wrapDisplayName from './wrapDisplayName'
import debounce from 'debounce'

import type { Node, ComponentType } from 'react'

type ValidEvent = 'click' | 'touchstart' | 'focusin' | 'focus'
type EventHandler = (event: Event, relatedElement?: HTMLElement) => any

type EventOutsideProps = {
  outsideEvents?: ValidEvent[],
  onEventOutside?: EventHandler,
  children?: Node
}

const HANDLE_TIMEOUT = 200

const DEFAULT_OUTSIDE_EVENTS = ['click', 'touchstart', 'focusin', 'focus']

const withEventOutside = (
  defaultOutsideEvents: ValidEvent[] = DEFAULT_OUTSIDE_EVENTS
) => (Target?: ComponentType<*>) => {
  class EventOutside extends Component<EventOutsideProps> {
    container: ?HTMLElement
    target: ?Component<*>

    static defaultProps = {
      outsideEvents: defaultOutsideEvents
    }

    componentDidMount() {
      const { outsideEvents = [] } = this.props
      outsideEvents.forEach(eventName =>
        document.addEventListener(eventName, this.handleEvent, true)
      )
    }

    componentWillUnmount() {
      const { outsideEvents = [] } = this.props
      outsideEvents.forEach(eventName =>
        document.removeEventListener(eventName, this.handleEvent, true)
      )
    }

    setContainer = (ref: ?HTMLElement) => (this.container = ref)

    setTarget = (ref: ?Component<any>) => (this.target = ref)

    handleEvent = debounce((event: Event) => {
      const containerElement = this.container

      if (containerElement) {
        setImmediate(() => {
          let relatedElement = event.target
          if (event.type === 'focus') {
            relatedElement = document.activeElement
          }

          if (relatedElement instanceof HTMLElement) {
            const onEventOutside =
              this.target &&
              typeof this.target.handleEventOutside === 'function'
                ? this.target.handleEventOutside.bind(this.target)
                : this.props.onEventOutside
            const isWithinContainer = containerElement.contains(relatedElement)
            if (!isWithinContainer && onEventOutside) {
              onEventOutside(event, relatedElement)
            }
          }
        })
      }
    }, HANDLE_TIMEOUT)

    render() {
      const { children, outsideEvents, onEventOutside, ...props } = this.props
      return (
        <div className="event-outside-container" ref={this.setContainer}>
          {Target ? (
            <Target {...props} children={children} ref={this.setTarget} />
          ) : (
            children
          )}
        </div>
      )
    }
  }

  if (Target) {
    EventOutside = hoistNonReactStatics(EventOutside, Target)
    if (process.env.NODE_ENV !== 'production') {
      EventOutside.displayName = wrapDisplayName(Target, 'withEventOutside')
    }
  }

  return EventOutside
}

export type { ValidEvent, EventOutsideProps }
export { DEFAULT_OUTSIDE_EVENTS }
export default withEventOutside
