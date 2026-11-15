/**
 * server/api/generateRecipe.js
 * 
 * Secure server-side handler for recipe generation.
 * Communicates with the Google Gemini API using the server's private environment variable.
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

/**
 * Expected JSON schema for Gemini structured output.
 */
const RECIPE_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Appetizing recipe title' },
    description: { type: 'string', description: 'Culinary description and flavor profile' },
    cuisine: { type: 'string', description: 'Cuisine style (e.g. Italian, Mexican, Asian Fusion, Mediterranean)' },
    difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'] },
    servings: { type: 'integer', description: 'Base serving yield' },
    prepTimeMinutes: { type: 'integer', description: 'Preparation time in minutes' },
    cookTimeMinutes: { type: 'integer', description: 'Cooking time in minutes' },
    caloriesPerServing: { type: 'integer', description: 'Estimated calories per serving' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Ingredient name' },
          amount: { type: 'number', description: 'Numeric quantity' },
          unit: { type: 'string', description: 'Culinary unit (e.g. cup, tbsp, tsp, g, cloves)' },
          isPantryStaple: { type: 'boolean', description: 'True if pantry staple (salt, oil, water), false if from fridge' },
          notes: { type: 'string', description: 'Preparation note (e.g. finely chopped, room temperature)' }
        },
        required: ['name', 'amount', 'unit', 'isPantryStaple']
      }
    },
    instructions: {
      type: 'array',
      items: { type: 'string' },
      description: 'Step-by-step clear preparation and cooking instructions'
    },
    substitutions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          original: { type: 'string', description: 'Ingredient being swapped' },
          substitute: { type: 'string', description: 'Recommended substitution' },
          note: { type: 'string', description: 'Reason or usage tip' }
        },
        required: ['original', 'substitute']
      }
    },
    chefTip: { type: 'string', description: 'Pro chef tip to elevate this specific dish' }
  },
  required: ['title', 'description', 'cuisine', 'difficulty', 'servings', 'prepTimeMinutes', 'cookTimeMinutes', 'ingredients', 'instructions']
}

/**
 * Heuristic fallback recipe generator for demonstration / offline development
 * when GEMINI_API_KEY is not configured yet.
 */
function generateFallbackRecipe({ ingredients, dietaryPreference, mealType, targetServings = 2 }) {
  const mainIng = ingredients[0] || 'Seasonal Veggies'
  const secondIng = ingredients[1] || 'Fresh Herbs'
  const title = `Rustic ${capitalize(mainIng)} & ${capitalize(secondIng)} Skillet`

  return {
    title,
    description: `A vibrant, aromatic sauté featuring your fresh ${ingredients.join(', ')}. Quick to prepare, deeply flavorful, and balanced with wholesome pantry essentials.`,
    cuisine: 'Comfort Fusion',
    difficulty: 'Easy',
    servings: targetServings || 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    caloriesPerServing: 380,
    ingredients: [
      ...ingredients.map((ing, i) => ({
        name: capitalize(ing),
        amount: i === 0 ? 1.5 : 1,
        unit: 'cup',
        isPantryStaple: false,
        notes: 'sliced or diced'
      })),
      { name: 'Olive Oil', amount: 2, unit: 'tbsp', isPantryStaple: true, notes: 'extra virgin' },
      { name: 'Garlic', amount: 2, unit: 'cloves', isPantryStaple: true, notes: 'minced' },
      { name: 'Sea Salt', amount: 0.5, unit: 'tsp', isPantryStaple: true, notes: 'to taste' },
      { name: 'Black Pepper', amount: 0.25, unit: 'tsp', isPantryStaple: true, notes: 'freshly cracked' }
    ],
    instructions: [
      `Wash and prep your ${ingredients.join(', ')} into bite-sized pieces.`,
      'Heat the olive oil in a wide skillet over medium heat until gently shimmering.',
      'Add the minced garlic and sauté for 45 seconds until fragrant, taking care not to scorch.',
      `Add the ${mainIng} and cook for 4-5 minutes until tender-crisp and lightly caramelized.`,
      `Fold in the ${ingredients.slice(1).join(' and ')}, season with sea salt and black pepper, and toss continuously for 3 minutes.`,
      'Remove from heat, rest for 1 minute to allow flavors to meld, and serve warm.'
    ],
    substitutions: [
      {
        original: 'Olive Oil',
        substitute: 'Butter or Avocado Oil',
        note: 'Provides equivalent richness and cooking lubricity.'
      },
      {
        original: 'Garlic',
        substitute: 'Shallots or Garlic Powder',
        note: 'Use 0.5 tsp garlic powder if fresh cloves are unavailable.'
      }
    ],
    chefTip: 'Finish with a squeeze of fresh lemon juice or a dash of chili flakes right before serving to brighten the savory notes!',
    isDemoMode: true
  }
}

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Controller handler for generating a recipe from ingredients.
 * 
 * @param {Object} body
 * @param {string[]} body.ingredients - User available ingredients
 * @param {string} [body.dietaryPreference]
 * @param {string} [body.mealType]
 * @param {string} [body.maxTime]
 * @param {number} [body.targetServings=2]
 * @returns {Promise<Object>}
 */
export async function generateRecipeHandler(body) {
  const { ingredients = [], dietaryPreference, mealType, maxTime, targetServings = 2 } = body

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw { status: 400, message: 'Please provide at least one ingredient from your fridge.' }
  }

  const cleanedIngredients = ingredients
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0)

  if (cleanedIngredients.length === 0) {
    throw { status: 400, message: 'Ingredient list cannot be blank.' }
  }

  const apiKey = process.env.GEMINI_API_KEY

  // If no Gemini API key is configured, utilize the smart fallback engine
  if (
    !apiKey ||
    apiKey.trim() === '' ||
    apiKey === 'undefined' ||
    apiKey === 'your_gemini_api_key_here'
  ) {
    return generateFallbackRecipe({
      ingredients: cleanedIngredients,
      dietaryPreference,
      mealType,
      targetServings
    })
  }

  // Construct prompt for LLM
  const prompt = `
You are an expert culinary chef and recipe developer.
The user wants to cook a meal using only the items currently in their fridge:
Available Fridge Ingredients: ${cleanedIngredients.join(', ')}

Preferences & Constraints:
- Dietary Preference: ${dietaryPreference || 'None (Any)'}
- Meal Type: ${mealType || 'Any'}
- Maximum Cooking Time: ${maxTime ? `${maxTime} minutes` : 'Flexible'}
- Serving Count Target: ${targetServings || 2}

Guidelines:
1. Maximize the use of the user's available ingredients.
2. You may include common basic pantry staples (olive oil, butter, salt, black pepper, water, garlic) as needed.
3. Every step in instructions must be clear, actionable, and numbered logically.
4. Provide 2-3 realistic substitutions in case user lacks a pantry item or prefers alternatives.
5. Return ONLY a structured JSON conforming strictly to the response schema.
`.trim()

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: RECIPE_RESPONSE_SCHEMA,
          temperature: 0.7
        }
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      let parsedErr = errText
      try {
        const jsonErr = JSON.parse(errText)
        parsedErr = jsonErr.error?.message || errText
      } catch (_) {}

      // Handle common API key / quota errors gracefully
      if (response.status === 400 || response.status === 403) {
        throw {
          status: response.status,
          message: `Gemini API Authentication error: ${parsedErr}. Please check your GEMINI_API_KEY in .env.`
        }
      } else if (response.status === 429) {
        throw {
          status: 429,
          message: 'Gemini API rate limit exceeded. Please wait a moment and try again.'
        }
      }
      throw { status: response.status, message: `Gemini API error: ${parsedErr}` }
    }

    const result = await response.json()
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) {
      throw { status: 502, message: 'LLM returned an empty response. Please try again.' }
    }

    const recipeData = JSON.parse(rawText)
    return { ...recipeData, isDemoMode: false }
  } catch (error) {
    if (error.status) throw error
    throw {
      status: 500,
      message: `Failed to generate recipe from LLM: ${error.message || 'Network error'}`
    }
  }
}
