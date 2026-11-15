import { useState, useCallback } from 'react'

/**
 * useRecipe Hook
 * 
 * Custom hook to encapsulate all recipe generation, serving scaling,
 * active cooking step toggling, and asynchronous state transitions.
 * 
 * Architecture note:
 * Keeps UI components purely presentational by centralizing business logic,
 * API communication handling, and error handling here.
 */
export function useRecipe() {
  const [recipe, setRecipe] = useState(null)
  const [servings, setServings] = useState(2)
  const [completedSteps, setCompletedSteps] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Implementation will be expanded in upcoming phases
  const generateRecipeFromIngredients = useCallback(async (ingredients) => {
    // Phase 2/3 will connect this to recipeService
  }, [])

  const resetRecipe = useCallback(() => {
    setRecipe(null)
    setCompletedSteps([])
    setError(null)
  }, [])

  return {
    recipe,
    servings,
    setServings,
    completedSteps,
    isLoading,
    error,
    generateRecipeFromIngredients,
    resetRecipe
  }
}

export default useRecipe
