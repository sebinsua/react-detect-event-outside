import type { ComponentType } from 'react'

const getDisplayName = (Component: ComponentType<*>): string => {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

const wrapDisplayName = (
  BaseComponent: ComponentType<*>,
  hocName: string
): string => `${hocName}(${getDisplayName(BaseComponent)})`

export default wrapDisplayName
