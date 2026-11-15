import './CheckableSteps.css'

function CheckableSteps({
  instructions = [],
  completedSteps = [],
  onToggleStep
}) {
  const totalSteps = instructions.length
  const completedCount = completedSteps.length
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0

  return (
    <div className="checkable-steps-card">
      <div className="steps-header">
        <div>
          <h3 className="steps-heading">
            <span>👨‍🍳</span> Step-by-Step Instructions
          </h3>
          <p className="steps-subheading">
            Check off each step as you cook to keep your place.
          </p>
        </div>

        <div className="progress-container">
          <div className="progress-labels">
            <span className="progress-text">
              {completedCount} of {totalSteps} steps completed
            </span>
            <span className="progress-percent">{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="steps-list">
        {instructions.map((stepText, index) => {
          const isDone = completedSteps.includes(index)

          return (
            <div
              key={index}
              className={`step-card ${isDone ? 'step-completed' : ''}`}
              onClick={() => onToggleStep(index)}
            >
              <div className="step-checkbox-wrapper">
                <input
                  type="checkbox"
                  className="step-checkbox"
                  checked={isDone}
                  onChange={() => {}} // Handled by div click
                  aria-label={`Mark step ${index + 1} as completed`}
                />
              </div>

              <div className="step-body">
                <div className="step-header-meta">
                  <span className="step-number-badge">Step {index + 1}</span>
                  {isDone && <span className="step-done-label">Completed ✓</span>}
                </div>
                <p className="step-text">{stepText}</p>
              </div>
            </div>
          )
        })}
      </div>

      {progressPercent === 100 && (
        <div className="all-steps-complete-banner">
          <span className="congrats-icon">🎉</span>
          <div>
            <strong>Bon Appétit!</strong>
            <p>You have finished all cooking steps. Time to plate and enjoy your homemade creation!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckableSteps
