import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 left-4 z-50 p-5 bg-red-950/90 border border-red-500 rounded-2xl max-w-md text-xs font-mono text-red-200 shadow-2xl glassmorphic">
          <h4 className="font-bold text-sm text-red-400 mb-2 flex items-center gap-1.5">
            ⚠️ 3D Render Error
          </h4>
          <p className="overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-40 scrollbar-thin">
            {this.state.error?.message || String(this.state.error)}
          </p>
          <p className="mt-3 text-zinc-400 border-t border-zinc-800 pt-2">
            The standard 2D layout has loaded as a fallback. Please check the browser console for details.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
