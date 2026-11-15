/**
 * scaleIngredients.js
 * 
 * Utility function to dynamically scale ingredient quantities based on serving adjustments.
 * Ensures clean numerical rounding and readable fractions/units.
 */

/**
 * Calculates scaled ingredient amount based on current servings vs base recipe servings.
 * 
 * @param {number} amount - Baseline quantity
 * @param {number} currentServings - Currently chosen serving count
 * @param {number} baseServings - Base servings specified in recipe
 * @returns {number} Scaled quantity rounded to 2 decimal places
 */
export function scaleAmount(amount, currentServings, baseServings) {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) return amount
  if (!baseServings || baseServings <= 0) return amount

  const scaled = (amount * currentServings) / baseServings
  // Round to nearest hundredth or clean float
  return Math.round(scaled * 100) / 100
}

/**
 * Scales an entire list of ingredients.
 * 
 * @param {Array<{name: string, amount: number, unit: string}>} ingredients
 * @param {number} currentServings
 * @param {number} baseServings
 * @returns {Array<{name: string, amount: number, unit: string}>}
 */
export function scaleIngredientsList(ingredients = [], currentServings = 1, baseServings = 1) {
  return ingredients.map((item) => ({
    ...item,
    amount: scaleAmount(item.amount, currentServings, baseServings)
  }))
}
