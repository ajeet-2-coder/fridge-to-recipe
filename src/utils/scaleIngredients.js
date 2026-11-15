/**
 * scaleIngredients.js
 * 
 * Mathematical and formatting utilities for dynamic ingredient scaling.
 */

/**
 * Common culinary fraction approximations.
 */
const VULGAR_FRACTIONS = [
  { val: 0.125, str: '⅛' },
  { val: 0.25, str: '¼' },
  { val: 0.333, str: '⅓' },
  { val: 0.375, str: '⅜' },
  { val: 0.5, str: '½' },
  { val: 0.625, str: '⅝' },
  { val: 0.666, str: '⅔' },
  { val: 0.75, str: '¾' },
  { val: 0.875, str: '⅞' }
]

/**
 * Scales a numeric amount proportionally by serving ratio.
 * 
 * @param {number|string} amount - Baseline amount
 * @param {number} currentServings - Selected servings count
 * @param {number} baseServings - Base servings specified in recipe
 * @returns {number} Scaled numeric amount
 */
export function scaleAmount(amount, currentServings, baseServings) {
  const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount)
  if (isNaN(numericAmount) || numericAmount <= 0) return amount
  if (!baseServings || baseServings <= 0) return numericAmount

  const scaled = (numericAmount * currentServings) / baseServings
  return Math.round(scaled * 100) / 100
}

/**
 * Formats a scaled number into clean culinary notation (e.g. 1 ½ or 2.5).
 * 
 * @param {number|string} amount - Numeric value
 * @returns {string} Human-friendly display string
 */
export function formatCulinaryAmount(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount)
  if (isNaN(num) || num <= 0) return ''

  const whole = Math.floor(num)
  const remainder = num - whole

  if (remainder < 0.05) {
    return whole > 0 ? `${whole}` : ''
  }

  // Find closest vulgar fraction within tolerance
  for (const fraction of VULGAR_FRACTIONS) {
    if (Math.abs(remainder - fraction.val) < 0.05) {
      return whole > 0 ? `${whole} ${fraction.str}` : fraction.str
    }
  }

  // Default to 1 decimal place if no exact fraction match
  return num % 1 === 0 ? num.toString() : num.toFixed(1)
}

/**
 * Scales an entire list of ingredients by serving ratio.
 * 
 * @param {Array<{name: string, amount: number, unit: string, isPantryStaple?: boolean}>} ingredients
 * @param {number} currentServings
 * @param {number} baseServings
 * @returns {Array<Object>} Scaled ingredients list
 */
export function scaleIngredientsList(ingredients = [], currentServings = 1, baseServings = 1) {
  if (!Array.isArray(ingredients)) return []
  return ingredients.map((item) => {
    const rawScaled = scaleAmount(item.amount, currentServings, baseServings)
    return {
      ...item,
      amount: rawScaled,
      formattedAmount: formatCulinaryAmount(rawScaled)
    }
  })
}
