import './LoadingState.css'

function LoadingState({
  message = 'Crafting your personalized recipe...',
  loadingStage = 'Analyzing available ingredients...'
}) {
  return (
    <div className="loading-state-card">
      <div className="culinary-animation-wrapper">
        <div className="pot-element">
          <span className="steam steam-1">~</span>
          <span className="steam steam-2">~</span>
          <span className="steam steam-3">~</span>
          <div className="pot-icon">🍳</div>
        </div>
      </div>

      <h3 className="loading-title">{message}</h3>
      <p className="loading-stage-badge">{loadingStage}</p>

      <div className="loading-progress-bar">
        <div className="loading-shimmer-fill"></div>
      </div>

      <p className="loading-subtext">
        Our AI culinary engine is optimizing your fridge contents for flavor, texture, and minimal food waste.
      </p>
    </div>
  )
}

export default LoadingState
