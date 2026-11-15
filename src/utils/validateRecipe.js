/**
 * validateRecipe.js
 * 
 * Validates and normalizes structured Recipe JSON from LLM or backend.
 */

/**
 * Validates and sanitizes raw recipe data.
 * 
 * @param {any} data - Raw parsed JSON response
 * @returns {{ isValid: boolean, recipe: Object | null, errors: string[] }}
 */
export function validateRecipe(data) {
  const errors = []

  if (!data || typeof data !== 'object') {
    return { isValid: false, recipe: null, errors: ['Response is empty or not a valid object'] }
  }

  // Mandatory fields check
  const title = typeof data.title === 'string' ? data.title.trim() : ''
  if (!title) {
    errors.push('Recipe title is missing or invalid')
  }

  const instructions = Array.isArray(data.instructions)
    ? data.instructions.filter((step) => typeof step === 'string' && step.trim().length > 0)
    : []

  if (instructions.length === 0) {
    errors.push('Recipe must contain at least one cooking step instruction')
  }

  const rawIngredients = Array.isArray(data.ingredients) ? data.ingredients : []
  const ingredients = rawIngredients
    .filter((item) => item && typeof item.name === 'string' && item.name.trim().length > 0)
    .map((item) => ({
      name: item.name.trim(),
      amount: typeof item.amount === 'number' && item.amount > 0 ? item.amount : 1,
      unit: typeof item.unit === 'string' ? item.unit.trim() : '',
      isPantryStaple: Boolean(item.isPantryStaple),
      notes: typeof item.notes === 'string' ? item.notes.trim() : ''
    }))

  if (ingredients.length === 0) {
    errors.push('Recipe must include at least one valid ingredient')
  }

  if (errors.length > 0) {
    return { isValid: false, recipe: null, errors }
  }

  // Clean, normalized recipe object
  const normalizedRecipe = {
    title,
    description: typeof data.description === 'string' ? data.description.trim() : 'A delicious recipe crafted from your available ingredients.',
    cuisine: typeof data.cuisine === 'string' && data.cuisine.trim() ? data.cuisine.trim() : 'Chef Special',
    difficulty: ['Easy', 'Medium', 'Hard'].includes(data.difficulty) ? data.difficulty : 'Medium',
    servings: typeof data.servings === 'number' && data.servings > 0 ? Math.round(data.servings) : 2,
    prepTimeMinutes: typeof data.prepTimeMinutes === 'number' && data.prepTimeMinutes >= 0 ? data.prepTimeMinutes : 15,
    cookTimeMinutes: typeof data.cookTimeMinutes === 'number' && data.cookTimeMinutes >= 0 ? data.cookTimeMinutes : 20,
    caloriesPerServing: typeof data.caloriesPerServing === 'number' ? data.caloriesPerServing : null,
    ingredients,
    instructions,
    substitutions: Array.isArray(data.substitutions)
      ? data.substitutions
          .filter((s) => s && s.original && s.substitute)
          .map((s) => ({
            original: String(s.original).trim(),
            substitute: String(s.substitute).trim(),
            note: s.note ? String(s.note).trim() : ''
          }))
      : [],
    chefTip: typeof data.chefTip === 'string' ? data.chefTip.trim() : null
  }

  return {
    isValid: true,
    recipe: normalizedRecipe,
    errors: []
  }
}
