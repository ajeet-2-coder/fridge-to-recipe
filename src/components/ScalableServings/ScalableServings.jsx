import './ScalableServings.css'

function ScalableServings({
  currentServings = 2,
  baseServings = 2,
  onChange,
  min = 1,
  max = 16
}) {
  const handleDecrement = () => {
    if (currentServings > min) {
      onChange(currentServings - 1)
    }
  }

  const handleIncrement = () => {
    if (currentServings < max) {
      onChange(currentServings + 1)
    }
  }

  const isScaled = currentServings !== baseServings

  return (
    <div className="scalable-servings-card">
      <div className="servings-info">
        <span className="servings-icon">🍽️</span>
        <div>
          <span className="servings-title">Adjust Recipe Yield</span>
          <span className="servings-subtitle">
            {isScaled
              ? `Scaled from base of ${baseServings} portions (quantities updated automatically)`
              : `Original base recipe yield (${baseServings} portions)`}
          </span>
        </div>
      </div>

      <div className="servings-controls">
        <button
          type="button"
          className="servings-btn"
          onClick={handleDecrement}
          disabled={currentServings <= min}
          title="Decrease servings"
        >
          –
        </button>

        <span className="servings-count-display">
          <strong>{currentServings}</strong>
          <span className="servings-unit">
            {currentServings === 1 ? 'portion' : 'portions'}
          </span>
        </span>

        <button
          type="button"
          className="servings-btn"
          onClick={handleIncrement}
          disabled={currentServings >= max}
          title="Increase servings"
        >
          +
        </button>
      </div>

      <div className="quick-servings-presets">
        {[2, 4, 6].map((count) => (
          <button
            key={count}
            type="button"
            className={`preset-btn ${currentServings === count ? 'active' : ''}`}
            onClick={() => onChange(count)}
          >
            {count}x
          </button>
        ))}
      </div>
    </div>
  )
}

export default ScalableServings
