import { useState, useCallback, useRef, useEffect } from 'react'
import { requestRecipeGeneration } from '../services/recipeService'

const LOADING_MESSAGES = [
  'Checking your fridge ingredients...',
  'Pairing flavor compounds and textures...',
  'Balancing spices and culinary proportions...',
  'Drafting step-by-step chef instructions...',
  'Finalizing plating and serving recommendations...'
]

export function useRecipe() {
  const [ingredients, setIngredients] = useState([])
  const [dietaryPreference, setDietaryPreference] = useState('')
  const [mealType, setMealType] = useState('')
  const [maxTime, setMaxTime] = useState('')

  const [recipe, setRecipe] = useState(null)
  const [servings, setServings] = useState(2)
  const [completedSteps, setCompletedSteps] = useState([])
  const [checkedIngredients, setCheckedIngredients] = useState([])
  const [appliedSwaps, setAppliedSwaps] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(LOADING_MESSAGES[0])
  const [error, setError] = useState(null)

  const loadingIntervalRef = useRef(null)

  // Rotate loading stage messages during generation
  useEffect(() => {
    if (isLoading) {
      let stageIndex = 0
      loadingIntervalRef.current = setInterval(() => {
        stageIndex = (stageIndex + 1) % LOADING_MESSAGES.length
        setLoadingStage(LOADING_MESSAGES[stageIndex])
      }, 1800)
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current)
      }
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current)
      }
    }
  }, [isLoading])

  const addIngredient = useCallback((name) => {
    if (!name) return
    const trimmed = name.trim()
    if (!trimmed) return

    setIngredients((prev) => {
      // Prevent case-insensitive duplicates
      const exists = prev.some((item) => item.toLowerCase() === trimmed.toLowerCase())
      if (exists) return prev
      return [...prev, trimmed]
    })
    setError(null)
  }, [])

  const removeIngredient = useCallback((nameToRemove) => {
    setIngredients((prev) => prev.filter((item) => item !== nameToRemove))
  }, [])

  const clearIngredients = useCallback(() => {
    setIngredients([])
    setError(null)
  }, [])

  const toggleStep = useCallback((stepIndex) => {
    setCompletedSteps((prev) => {
      if (prev.includes(stepIndex)) {
        return prev.filter((i) => i !== stepIndex)
      } else {
        return [...prev, stepIndex]
      }
    })
  }, [])

  const toggleIngredient = useCallback((ingredientName) => {
    setCheckedIngredients((prev) => {
      if (prev.includes(ingredientName)) {
        return prev.filter((name) => name !== ingredientName)
      } else {
        return [...prev, ingredientName]
      }
    })
  }, [])

  const applySwap = useCallback((original, substitute) => {
    setAppliedSwaps((prev) => ({
      ...prev,
      [original]: substitute
    }))
  }, [])

  const generateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError({
        title: 'No Ingredients Entered',
        message: 'Please add at least one ingredient currently in your fridge to generate a recipe.'
      })
      return
    }

    setLoadingStage(LOADING_MESSAGES[0])
    setIsLoading(true)
    setError(null)

    try {
      const generatedRecipe = await requestRecipeGeneration({
        ingredients,
        dietaryPreference,
        mealType,
        maxTime,
        targetServings: servings
      })

      setRecipe(generatedRecipe)
      setServings(generatedRecipe.servings || 2)
      setCompletedSteps([])
      setCheckedIngredients([])
      setAppliedSwaps({})
    } catch (err) {
      setError({
        title: 'Recipe Generation Notice',
        message: err.message || 'We could not generate a recipe at this time. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }, [ingredients, dietaryPreference, mealType, maxTime, servings])

  const resetRecipe = useCallback(() => {
    setRecipe(null)
    setCompletedSteps([])
    setCheckedIngredients([])
    setAppliedSwaps({})
    setError(null)
  }, [])

  const loadSampleBasket = useCallback((basket) => {
    if (!basket || !Array.isArray(basket.ingredients)) return
    setIngredients(basket.ingredients)
    if (basket.dietaryPreference) setDietaryPreference(basket.dietaryPreference)
    if (basket.mealType) setMealType(basket.mealType)
    if (basket.maxTime) setMaxTime(basket.maxTime)
    setError(null)
  }, [])

  return {
    ingredients,
    dietaryPreference,
    setDietaryPreference,
    mealType,
    setMealType,
    maxTime,
    setMaxTime,
    recipe,
    servings,
    setServings,
    completedSteps,
    checkedIngredients,
    appliedSwaps,
    isLoading,
    loadingStage,
    error,
    addIngredient,
    removeIngredient,
    clearIngredients,
    toggleStep,
    toggleIngredient,
    applySwap,
    generateRecipe,
    resetRecipe,
    loadSampleBasket
  }
}

export default useRecipe
