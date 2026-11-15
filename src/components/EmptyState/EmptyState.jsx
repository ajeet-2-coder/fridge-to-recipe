import './EmptyState.css'

const SAMPLE_BASKETS = [
  {
    title: 'Mediterranean Skillet',
    icon: '🍅',
    description: 'Fresh, vibrant Italian-inspired flavors.',
    ingredients: ['Eggs', 'Cherry Tomatoes', 'Spinach', 'Feta Cheese', 'Garlic'],
    dietaryPreference: 'Vegetarian',
    mealType: 'Dinner',
    maxTime: '20'
  },
  {
    title: 'Protein Power Scramble',
    icon: '🍳',
    description: 'Quick, nutrient-dense breakfast or brunch.',
    ingredients: ['Eggs', 'Bell Pepper', 'Cheddar Cheese', 'Onion', 'Avocado'],
    dietaryPreference: 'High-Protein',
    mealType: 'Breakfast',
    maxTime: '15'
  },
  {
    title: 'Weeknight Pantry Pasta',
    icon: '🍝',
    description: 'Comforting, simple meal with standard staples.',
    ingredients: ['Pasta', 'Garlic', 'Tomatoes', 'Olive Oil', 'Parmesan'],
    dietaryPreference: 'Vegetarian',
    mealType: 'Dinner',
    maxTime: '25'
  }
]

function EmptyState({ onSelectSampleBasket }) {
  return (
    <div className="empty-state-card">
      <div className="how-it-works-section">
        <h3 className="how-title">How Fridge-to-Recipe Works</h3>
        <p className="how-subtitle">
          Turn scattered fridge items into delicious meals while reducing food waste.
        </p>

        <div className="steps-cards-row">
          <div className="step-feature-card">
            <span className="step-badge-num">1</span>
            <span className="step-icon">👀</span>
            <strong className="step-feature-title">Check Your Fridge</strong>
            <p className="step-feature-desc">
              Notice fresh produce, proteins, dairy, or leftover staples you have on hand.
            </p>
          </div>

          <div className="step-feature-card">
            <span className="step-badge-num">2</span>
            <span className="step-icon">✍️</span>
            <strong className="step-feature-title">Add Ingredients</strong>
            <p className="step-feature-desc">
              Type or select items above. Set dietary goals or time limits if you're in a hurry.
            </p>
          </div>

          <div className="step-feature-card">
            <span className="step-badge-num">3</span>
            <span className="step-icon">🍽️</span>
            <strong className="step-feature-title">Cook & Scale</strong>
            <p className="step-feature-desc">
              Receive a structured recipe with dynamic yield scaling, substitutions, and checklist steps.
            </p>
          </div>
        </div>
      </div>

      {/* Preset sample baskets */}
      <div className="sample-baskets-section">
        <div className="baskets-header">
          <span className="baskets-badge">Try an Example</span>
          <h4 className="baskets-title">Or Try One of These Sample Fridge Baskets:</h4>
        </div>

        <div className="baskets-grid">
          {SAMPLE_BASKETS.map((basket) => (
            <div
              key={basket.title}
              className="basket-card"
              onClick={() => onSelectSampleBasket(basket)}
            >
              <div className="basket-card-top">
                <span className="basket-icon">{basket.icon}</span>
                <span className="basket-arrow">Use Basket →</span>
              </div>
              <strong className="basket-card-title">{basket.title}</strong>
              <p className="basket-card-desc">{basket.description}</p>
              <div className="basket-pills">
                {basket.ingredients.map((ing) => (
                  <span key={ing} className="basket-pill">{ing}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmptyState
