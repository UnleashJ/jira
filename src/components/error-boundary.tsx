import React, { ReactElement, ReactNode } from "react";

/**
 * children
 * fallbackRender
 */
type FallbackRender = (props: {error: Error | null}) => ReactElement
export class ErrorBoundary extends React.Component
<React.PropsWithChildren<{fallbackRender:FallbackRender}>, {error: Error | null}> {
  state = {error: null}
  
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state
    const {fallbackRender, children} = this.props
    if(error) {
      return fallbackRender({error})
    }
    return children
  }

}