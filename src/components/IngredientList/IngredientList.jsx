import { scaleIngredientsList } from '../../utils/scaleIngredients'
import './IngredientList.css'

function IngredientList({
  ingredients = [],
  servings = 2,
  baseServings = 2,
  checkedIngredients = [],
  onToggleIngredient,
  appliedSwaps = {}
}) {
  const scaledList = scaleIngredientsList(ingredients, servings, baseServings)

  const fridgeIngredients = scaledList.filter((item) => !item.isPantryStaple)
  const pantryIngredients = scaledList.filter((item) => item.isPantryStaple)

  const renderIngredientItem = (item, index) => {
    const isChecked = checkedIngredients.includes(item.name)
    const activeSwap = appliedSwaps[item.name]

    return (
      <li
        key={`${item.name}-${index}`}
        className={`ingredient-list-item ${isChecked ? 'item-checked' : ''}`}
        onClick={() => onToggleIngredient(item.name)}
      >
        <div className="ingredient-item-left">
          <input
            type="checkbox"
            className="ingredient-checkbox"
            checked={isChecked}
            onChange={() => {}} // Controlled by li click
            aria-label={`Mark ${item.name} as ready`}
          />
          <div>
            <span className="ingredient-name">
              {activeSwap ? (
                <>
                  <span className="swapped-old">{item.name}</span>
                  <span className="swapped-new"> ➔ {activeSwap}</span>
                </>
              ) : (
                item.name
              )}
            </span>
            {item.notes && <span className="ingredient-notes"> ({item.notes})</span>}
          </div>
        </div>

        <div className="ingredient-amount-badge">
          {item.formattedAmount ? (
            <span>
              {item.formattedAmount} {item.unit}
            </span>
          ) : (
            <span>{item.unit || 'as needed'}</span>
          )}
        </div>
      </li>
    )
  }

  return (
    <div className="ingredient-list-card">
      <div className="section-header">
        <h3 className="section-title">
          <span>🧺</span> Required Ingredients
        </h3>
        <span className="checklist-hint">Tap any item to check off as you prep</span>
      </div>

      {fridgeIngredients.length > 0 && (
        <div className="sub-group">
          <h4 className="group-heading">From Your Fridge</h4>
          <ul className="ingredients-ul">
            {fridgeIngredients.map((item, idx) => renderIngredientItem(item, idx))}
          </ul>
        </div>
      )}

      {pantryIngredients.length > 0 && (
        <div className="sub-group pantry-group">
          <h4 className="group-heading">Pantry Staples & Seasonings</h4>
          <ul className="ingredients-ul">
            {pantryIngredients.map((item, idx) => renderIngredientItem(item, idx))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default IngredientList
