/**
 * validateRecipe.js
 * 
 * Validates that an LLM response conforms to the strict structured Recipe JSON schema.
 * Prevents malformed, incomplete, or unexpected LLM responses from causing runtime UI errors.
 * 
 * Expected schema:
 * {
 *   title: string,
 *   description: string,
 *   cuisine: string,
 *   difficulty: "Easy" | "Medium" | "Hard",
 *   servings: number,
 *   prepTimeMinutes: number,
 *   cookTimeMinutes: number,
 *   ingredients: Array<{ name: string, amount: number, unit: string, isPantryStaple?: boolean }>,
 *   instructions: Array<string>,
 *   substitutions: Array<{ original: string, substitute: string, note?: string }>
 * }
 */

/**
 * Validates the raw parsed JSON response from the LLM.
 * 
 * @param {any} data - Raw data to validate
 * @returns {{ isValid: boolean, recipe: Object | null, errors: string[] }}
 */
export function validateRecipe(data) {
  const errors = []

  if (!data || typeof data !== 'object') {
    return { isValid: false, recipe: null, errors: ['Response is empty or not an object'] }
  }

  if (typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('Missing or invalid recipe title')
  }

  if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
    errors.push('Recipe must have at least one ingredient')
  }

  if (!Array.isArray(data.instructions) || data.instructions.length === 0) {
    errors.push('Recipe must include preparation instructions')
  }

  return {
    isValid: errors.length === 0,
    recipe: errors.length === 0 ? data : null,
    errors
  }
}
