import './ErrorState.css'

function ErrorState({
  title = 'Could Not Complete Generation',
  message = 'An unexpected issue occurred while crafting the recipe.',
  onRetry,
  onDismiss
}) {
  const isAuthNotice = message?.toLowerCase().includes('api_key') || message?.toLowerCase().includes('authentication')

  return (
    <div className="error-state-card">
      <div className="error-icon-wrapper">
        <span className="error-badge-icon">⚠️</span>
      </div>

      <div className="error-text-content">
        <h3 className="error-title">{title}</h3>
        <p className="error-message">{message}</p>

        {isAuthNotice && (
          <div className="error-help-box">
            <strong>Quick Setup Tip:</strong>
            <p>
              Ensure your <code>GEMINI_API_KEY</code> is defined in <code>.env</code> file in the project root. If you prefer to test without an API key, clear the key or leave it unset to activate automated demo mode!
            </p>
          </div>
        )}

        <div className="error-actions">
          {onRetry && (
            <button
              type="button"
              className="btn-retry"
              onClick={onRetry}
            >
              🔄 Try Again
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              className="btn-dismiss"
              onClick={onDismiss}
            >
              Adjust Ingredients
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorState
