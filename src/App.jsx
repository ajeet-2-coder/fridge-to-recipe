import { useRecipe } from './hooks/useRecipe'
import IngredientInput from './components/IngredientInput'
import RecipeView from './components/RecipeView'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import EmptyState from './components/EmptyState'

function App() {
  const {
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
  } = useRecipe()

  return (
    <div className="app-container">
      {/* App Top Brand Header */}
      <header style={{
        textAlign: 'center',
        padding: 'var(--space-8) 0 var(--space-6)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-1) var(--space-3)',
          backgroundColor: 'var(--color-primary-subtle)',
          color: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.875rem',
          fontWeight: 700,
          marginBottom: 'var(--space-3)'
        }}>
          <span>🍳</span> Fridge-to-Recipe AI
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'var(--color-text-main)',
          letterSpacing: '-0.025em',
          marginBottom: 'var(--space-2)'
        }}>
          Cook Delicious Meals With What You Have
        </h1>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '640px',
          margin: '0 auto'
        }}>
          Enter the fresh ingredients sitting in your fridge. Our culinary AI generates structured, scalable recipes with step-by-step guidance.
        </p>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: 'var(--space-8) 0' }}>
        {/* Error notification banner if any */}
        {error && (
          <ErrorState
            title={error.title}
            message={error.message}
            onRetry={generateRecipe}
            onDismiss={() => {}}
          />
        )}

        {/* Loading state indicator */}
        {isLoading && (
          <LoadingState
            message="Crafting Your Structured Recipe..."
            loadingStage={loadingStage}
          />
        )}

        {/* Generated Recipe Presentation View */}
        {!isLoading && recipe && (
          <RecipeView
            recipe={recipe}
            servings={servings}
            onServingsChange={setServings}
            completedSteps={completedSteps}
            onToggleStep={toggleStep}
            checkedIngredients={checkedIngredients}
            onToggleIngredient={toggleIngredient}
            appliedSwaps={appliedSwaps}
            onApplySwap={applySwap}
            onReset={resetRecipe}
          />
        )}

        {/* Input & Onboarding View (when no recipe active) */}
        {!isLoading && !recipe && (
          <>
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
              onClearIngredients={clearIngredients}
              onGenerate={generateRecipe}
              isLoading={isLoading}
              dietaryPreference={dietaryPreference}
              onDietaryChange={setDietaryPreference}
              mealType={mealType}
              onMealTypeChange={setMealType}
              maxTime={maxTime}
              onMaxTimeChange={setMaxTime}
            />

            <EmptyState onSelectSampleBasket={loadSampleBasket} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        textAlign: 'center',
        padding: 'var(--space-8) 0 var(--space-6)',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        borderTop: '1px solid var(--color-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)'
      }}>
        <div>
          Fridge-to-Recipe AI • Frontend Engineering Internship Project
        </div>
        <div style={{ fontSize: '0.8rem' }}>
          Built with React 19, Vite & Gemini Structured Output
        </div>
      </footer>
    </div>
  )
}

export default App
