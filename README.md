# `react-event-outside`
> `EventOutside` component for React.

### Approach

- Create an example project using `create-react-app` first.
- See: https://github.com/tj/react-click-outside/blob/master/index.js#L24-L30 
- Normally: `document.addEventListener('focusin', (evt) => console.log('focusing into', evt.target))`
- Create a simple API based on this, then...
- Build with the style of [`downshift`](https://github.com/kentcdodds/react-toggled/blob/master/src/index.js).
- Write-up what events do not bubble. See: https://en.wikipedia.org/wiki/DOM_events#Events (Context here: https://stackoverflow.com/a/5575576)
- Write a line of code to detect Firefox versions below 52 (well, actually perhaps use this: https://stackoverflow.com/questions/7337670/how-to-detect-focusin-support) and then...
- To support Firefox 45: `document.addEventListener('focus', (evt) => setImmediate(() => console.log('focusing into', document.activeElement)))`
- See: https://bugzilla.mozilla.org/show_bug.cgi?id=687787
- Should be able to announce here: https://github.com/tj/react-click-outside/issues/5
