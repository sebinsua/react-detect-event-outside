import * as React from 'react'

export type ValidEvent = 'click' | 'touchstart' | 'focusin' | 'focus'

export function withEventOutside<Props>(defaultOutsideEvents?: ReadonlyArray<ValidEvent>):
  (target?: React.Component<Props, any>) => React.Component<Props, any>

export const DEFAULT_OUTSIDE_EVENTS: ReadonlyArray<ValidEvent>

export interface EventOutsideProps {
  outsideEvents?: ReadonlyArray<ValidEvent>,
  onEventOutside?: (event: Event, relatedElement?: HTMLElement) => any,
  children?: React.Node
}

export default class EventOutside extends React.Component<EventOutsideProps> {}
