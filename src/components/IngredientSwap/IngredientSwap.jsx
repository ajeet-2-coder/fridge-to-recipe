import './IngredientSwap.css'

function IngredientSwap({
  substitutions = [],
  appliedSwaps = {},
  onApplySwap
}) {
  if (!substitutions || substitutions.length === 0) {
    return null
  }

  return (
    <div className="ingredient-swap-card">
      <div className="swap-header">
        <span className="swap-badge-icon">🔄</span>
        <div>
          <h3 className="swap-title">Smart Ingredient Substitutions</h3>
          <p className="swap-subtitle">
            Missing an ingredient or want a variation? Tap to apply a substitute.
          </p>
        </div>
      </div>

      <div className="swap-grid">
        {substitutions.map((sub, index) => {
          const isApplied = appliedSwaps[sub.original] === sub.substitute

          return (
            <div
              key={index}
              className={`swap-item ${isApplied ? 'swap-applied' : ''}`}
            >
              <div className="swap-pair">
                <span className="swap-original">{sub.original}</span>
                <span className="swap-arrow">➔</span>
                <span className="swap-substitute">{sub.substitute}</span>
              </div>

              {sub.note && <p className="swap-note">{sub.note}</p>}

              <button
                type="button"
                className={`btn-apply-swap ${isApplied ? 'btn-swap-active' : ''}`}
                onClick={() => onApplySwap(sub.original, isApplied ? null : sub.substitute)}
              >
                {isApplied ? '✓ Applied in Recipe' : '+ Swap in Recipe'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default IngredientSwap
