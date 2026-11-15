import { useState } from 'react'
import './IngredientInput.css'

const POPULAR_STAPLES = [
  { name: 'Eggs', emoji: '🥚' },
  { name: 'Tomatoes', emoji: '🍅' },
  { name: 'Garlic', emoji: '🧄' },
  { name: 'Onion', emoji: '🧅' },
  { name: 'Cheese', emoji: '🧀' },
  { name: 'Chicken Breast', emoji: '🍗' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Bell Pepper', emoji: '🫑' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Avocado', emoji: '🥑' }
]

function IngredientInput({
  ingredients = [],
  onAddIngredient,
  onRemoveIngredient,
  onClearIngredients,
  onGenerate,
  isLoading = false,
  dietaryPreference,
  onDietaryChange,
  mealType,
  onMealTypeChange,
  maxTime,
  onMaxTimeChange
}) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (!inputValue.trim()) return

    // Allow comma-separated bulk addition
    if (inputValue.includes(',')) {
      const parts = inputValue.split(',').map((p) => p.trim()).filter(Boolean)
      parts.forEach((part) => onAddIngredient(part))
    } else {
      onAddIngredient(inputValue)
    }
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="ingredient-input-card">
      <div className="card-header">
        <div className="card-icon-title">
          <span className="card-badge-icon">🥕</span>
          <div>
            <h2 className="card-heading">What's in your fridge?</h2>
            <p className="card-subheading">
              Add the fresh produce, proteins, and odds-and-ends you want to cook with.
            </p>
          </div>
        </div>
      </div>

      {/* Main input bar */}
      <div className="input-group">
        <input
          type="text"
          className="text-input"
          placeholder="e.g. eggs, cherry tomatoes, feta, leftover rice..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          type="button"
          className="btn-add"
          onClick={handleAdd}
          disabled={!inputValue.trim() || isLoading}
        >
          + Add
        </button>
      </div>

      {/* Quick Add Staples */}
      <div className="quick-add-section">
        <span className="quick-add-label">Quick Add Staples:</span>
        <div className="quick-add-chips">
          {POPULAR_STAPLES.map((staple) => {
            const isAdded = ingredients.some(
              (item) => item.toLowerCase() === staple.name.toLowerCase()
            )
            return (
              <button
                key={staple.name}
                type="button"
                className={`chip-button ${isAdded ? 'chip-added' : ''}`}
                onClick={() => !isAdded && onAddIngredient(staple.name)}
                disabled={isAdded || isLoading}
                title={isAdded ? 'Already added' : `Add ${staple.name}`}
              >
                <span>{staple.emoji}</span>
                <span>{staple.name}</span>
                {isAdded && <span className="chip-check">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Ingredients Badges */}
      <div className="selected-ingredients-section">
        <div className="selected-header">
          <span className="selected-count">
            Selected Ingredients ({ingredients.length})
          </span>
          {ingredients.length > 0 && (
            <button
              type="button"
              className="btn-clear"
              onClick={onClearIngredients}
              disabled={isLoading}
            >
              Clear All
            </button>
          )}
        </div>

        {ingredients.length === 0 ? (
          <div className="no-ingredients-hint">
            No ingredients added yet. Type an ingredient above or tap a quick-add staple to start!
          </div>
        ) : (
          <div className="ingredients-tags-container">
            {ingredients.map((ing) => (
              <span key={ing} className="ingredient-tag">
                <span className="tag-text">{ing}</span>
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => onRemoveIngredient(ing)}
                  disabled={isLoading}
                  title={`Remove ${ing}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dietary & Cooking Constraints */}
      <div className="preferences-grid">
        <div className="pref-field">
          <label className="pref-label" htmlFor="dietary-select">Dietary Style</label>
          <select
            id="dietary-select"
            className="pref-select"
            value={dietaryPreference}
            onChange={(e) => onDietaryChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Any Diet</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Dairy-Free">Dairy-Free</option>
            <option value="Low-Carb">Low-Carb</option>
            <option value="High-Protein">High-Protein</option>
          </select>
        </div>

        <div className="pref-field">
          <label className="pref-label" htmlFor="meal-select">Meal Type</label>
          <select
            id="meal-select"
            className="pref-select"
            value={mealType}
            onChange={(e) => onMealTypeChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Any Meal</option>
            <option value="Dinner">Dinner</option>
            <option value="Lunch">Lunch</option>
            <option value="Breakfast">Breakfast / Brunch</option>
            <option value="Quick Snack">Quick Snack</option>
          </select>
        </div>

        <div className="pref-field">
          <label className="pref-label" htmlFor="time-select">Max Cooking Time</label>
          <select
            id="time-select"
            className="pref-select"
            value={maxTime}
            onChange={(e) => onMaxTimeChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">No Time Limit</option>
            <option value="15">Under 15 Mins</option>
            <option value="30">Under 30 Mins</option>
            <option value="45">Under 45 Mins</option>
          </select>
        </div>
      </div>

      {/* Generate Action Button */}
      <div className="action-row">
        <button
          type="button"
          className="btn-generate"
          onClick={onGenerate}
          disabled={ingredients.length === 0 || isLoading}
        >
          {isLoading ? (
            <span className="btn-loading-content">
              <span className="spinner"></span> Creating Recipe...
            </span>
          ) : (
            <span>✨ Generate Structured Recipe</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default IngredientInput
