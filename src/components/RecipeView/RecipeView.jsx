import { useState } from 'react'
import RecipeCard from '../RecipeCard'
import ScalableServings from '../ScalableServings'
import IngredientList from '../IngredientList'
import CheckableSteps from '../CheckableSteps'
import IngredientSwap from '../IngredientSwap'
import './RecipeView.css'

function RecipeView({
  recipe,
  servings,
  onServingsChange,
  completedSteps,
  onToggleStep,
  checkedIngredients,
  onToggleIngredient,
  appliedSwaps,
  onApplySwap,
  onReset
}) {
  const [copiedToast, setCopiedToast] = useState(false)

  if (!recipe) return null

  const handleCopyRecipe = () => {
    const text = `
# ${recipe.title}
${recipe.description}

- Cuisine: ${recipe.cuisine}
- Difficulty: ${recipe.difficulty}
- Servings: ${servings} (Base: ${recipe.servings})
- Prep Time: ${recipe.prepTimeMinutes} mins | Cook Time: ${recipe.cookTimeMinutes} mins

## Ingredients:
${recipe.ingredients
  .map((i) => `- ${i.amount} ${i.unit} ${i.name}${i.notes ? ` (${i.notes})` : ''}`)
  .join('\n')}

## Instructions:
${recipe.instructions.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

Generated with Fridge-to-Recipe AI
`.trim()

    navigator.clipboard?.writeText(text).then(() => {
      setCopiedToast(true)
      setTimeout(() => setCopiedToast(false), 2500)
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="recipe-view-container">
      {/* Top action navigation */}
      <div className="recipe-view-nav">
        <button
          type="button"
          className="btn-back-nav"
          onClick={onReset}
        >
          ← Adjust Ingredients & Generate Another
        </button>

        <div className="recipe-action-buttons">
          <button
            type="button"
            className="btn-action"
            onClick={handleCopyRecipe}
            title="Copy recipe text to clipboard"
          >
            📋 {copiedToast ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            type="button"
            className="btn-action"
            onClick={handlePrint}
            title="Print recipe or save as PDF"
          >
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Main hero card */}
      <RecipeCard
        title={recipe.title}
        description={recipe.description}
        cuisine={recipe.cuisine}
        difficulty={recipe.difficulty}
        prepTimeMinutes={recipe.prepTimeMinutes}
        cookTimeMinutes={recipe.cookTimeMinutes}
        caloriesPerServing={recipe.caloriesPerServing}
        chefTip={recipe.chefTip}
        isDemoMode={recipe.isDemoMode}
      />

      {/* Serving scaling controller */}
      <ScalableServings
        currentServings={servings}
        baseServings={recipe.servings || 2}
        onChange={onServingsChange}
      />

      {/* Two-column layout for modern desktop view, stacking on mobile */}
      <div className="recipe-content-grid">
        <aside className="recipe-sidebar-column">
          <IngredientList
            ingredients={recipe.ingredients}
            servings={servings}
            baseServings={recipe.servings || 2}
            checkedIngredients={checkedIngredients}
            onToggleIngredient={onToggleIngredient}
            appliedSwaps={appliedSwaps}
          />

          <IngredientSwap
            substitutions={recipe.substitutions}
            appliedSwaps={appliedSwaps}
            onApplySwap={onApplySwap}
          />
        </aside>

        <section className="recipe-main-column">
          <CheckableSteps
            instructions={recipe.instructions}
            completedSteps={completedSteps}
            onToggleStep={onToggleStep}
          />
        </section>
      </div>

      {copiedToast && (
        <div className="toast-notification">
          ✓ Recipe copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default RecipeView
