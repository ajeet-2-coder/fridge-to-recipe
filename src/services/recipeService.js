/**
 * recipeService.js
 * 
 * Client network abstraction layer for recipe generation.
 * Enforces API security by routing through the application backend.
 */

import { validateRecipe } from '../utils/validateRecipe'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * Sends available ingredients and culinary preferences to generate a structured recipe.
 * 
 * @param {Object} options
 * @param {string[]} options.ingredients - Array of user-provided ingredients
 * @param {string} [options.dietaryPreference] - e.g. 'Vegetarian', 'Vegan', 'Gluten-Free'
 * @param {string} [options.mealType] - e.g. 'Dinner', 'Lunch', 'Breakfast'
 * @param {string} [options.maxTime] - e.g. '30'
 * @param {number} [options.targetServings=2] - Number of target portions
 * @returns {Promise<Object>} Validated structured recipe object
 */
export async function requestRecipeGeneration({
  ingredients = [],
  dietaryPreference = '',
  mealType = '',
  maxTime = '',
  targetServings = 2
}) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new Error('Please enter at least one ingredient from your fridge.')
  }

  const endpoint = `${API_BASE_URL}/generate-recipe`

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients,
        dietaryPreference,
        mealType,
        maxTime,
        targetServings
      })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const errorMessage = data.error || `Server responded with status ${response.status}`
      throw new Error(errorMessage)
    }

    // Validate structured recipe response against client schema
    const validation = validateRecipe(data)
    if (!validation.isValid) {
      throw new Error(`Invalid recipe structure received: ${validation.errors.join(', ')}`)
    }

    return {
      ...validation.recipe,
      isDemoMode: Boolean(data.isDemoMode)
    }
  } catch (error) {
    // If network itself failed (server offline)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the recipe server. Please verify the application server is running.')
    }
    throw error
  }
}
