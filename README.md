# `react-detect-event-outside`
> `EventOutside` component for React.

A component which detects `click`, `focus` and `touch` events outside from it and calls a function to handle the event.

> **NOTE**: We capture events at the `document` level and wish to support some events which [do not bubble](https://en.wikipedia.org/wiki/DOM_events#Events), for example to detect when elements outside a component have gained `focus`. In these situations we: (a) use the [`useCapture` argument of `addEventListener`](https://stackoverflow.com/questions/7398290/unable-to-understand-usecapture-attribute-in-addeventlistener), or (b) find a similar event which does bubble ([sometimes difficult](https://bugzilla.mozilla.org/show_bug.cgi?id=687787)).

## Example

### Using the `EventOutside` component

```js
import React from 'react'
import EventOutside from 'react-detect-event-outside'

const onEvent = (evt, el) => console.log('event happened outside', evt, el)

const SomeComponent = () => (
  <div className="SomeComponent">
    <EventOutside onEventOutside={onEvent}>
      <div className="SomeComponent-inside">
        <h2>Inside</h2>
        <input type="text" />
      </div>
    </EventOutside>
    <div className="SomeComponent-outside">
      <h2>Outside</h2>
      <input type="text" />
    </div>
  </div>
)

export default SomeComponent
```

### Wrapping your own component with the `withEventOutside` HOC

> *NOTE*: This is useful if you wish to cause some state change within a component, since
> the `handleEventOutside` handler is defined within your component.

```js
import React, { Component } from 'react'
import { withEventOutside } from 'react-detect-event-outside'

class Handler extends Component {
  handleEventOutside = (evt, el) =>
    console.log('Handler: event happened outside', evt, el)

  render() {
    const { children } = this.props
    return <div className="SomeComponent-inside">{children}</div>
  }
}

const WrappedHandler = withEventOutside()(Handler)

const SomeComponent = () => (
  <div className="SomeComponent">
    <WrappedHandler>
      <h2>Inside</h2>
      <input type="text" />
    </WrappedHandler>
    <div className="SomeComponent-outside">
      <h2>Outside</h2>
      <input type="text" />
    </div>
  </div>
)

export default SomeComponent
```

## Install

```sh
yarn add react-detect-event-outside
```
