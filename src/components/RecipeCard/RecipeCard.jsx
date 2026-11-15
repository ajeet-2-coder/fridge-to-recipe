import './RecipeCard.css'

function RecipeCard({
  title,
  description,
  cuisine,
  difficulty = 'Medium',
  prepTimeMinutes = 15,
  cookTimeMinutes = 20,
  caloriesPerServing,
  chefTip,
  isDemoMode = false
}) {
  const totalTime = (prepTimeMinutes || 0) + (cookTimeMinutes || 0)

  const getDifficultyClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'diff-easy'
      case 'hard':
        return 'diff-hard'
      default:
        return 'diff-medium'
    }
  }

  return (
    <div className="recipe-hero-card">
      {isDemoMode && (
        <div className="demo-mode-banner">
          <span className="demo-badge">Demo Mode</span>
          <span>
            Offline heuristic generation active. Add a <code>GEMINI_API_KEY</code> to <code>.env</code> for live multimodal AI generation!
          </span>
        </div>
      )}

      <div className="recipe-header-meta">
        <span className="cuisine-badge">{cuisine || 'Chef Special'}</span>
        <span className={`difficulty-badge ${getDifficultyClass(difficulty)}`}>
          ● {difficulty}
        </span>
      </div>

      <h1 className="recipe-title">{title}</h1>
      <p className="recipe-description">{description}</p>

      {/* Culinary metrics bar */}
      <div className="recipe-stats-grid">
        <div className="stat-item">
          <span className="stat-icon">⏱️</span>
          <div>
            <span className="stat-label">Total Time</span>
            <span className="stat-value">{totalTime} mins</span>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">🔪</span>
          <div>
            <span className="stat-label">Prep Time</span>
            <span className="stat-value">{prepTimeMinutes} mins</span>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">🔥</span>
          <div>
            <span className="stat-label">Cook Time</span>
            <span className="stat-value">{cookTimeMinutes} mins</span>
          </div>
        </div>

        {caloriesPerServing && (
          <div className="stat-item">
            <span className="stat-icon">🥗</span>
            <div>
              <span className="stat-label">Est. Calories</span>
              <span className="stat-value">{caloriesPerServing} kcal</span>
            </div>
          </div>
        )}
      </div>

      {chefTip && (
        <div className="chef-tip-banner">
          <span className="chef-tip-icon">👨‍🍳</span>
          <div className="chef-tip-content">
            <strong>Chef's Culinary Secret: </strong>
            <span>{chefTip}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeCard
