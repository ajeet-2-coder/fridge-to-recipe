/**
 * App Component
 * Root component of the Fridge-to-Recipe AI application.
 * Initialized with foundational layout, food-tech theme tokens, and structured module slots.
 */
function App() {
  return (
    <div className="app-container">
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
          fontWeight: 600,
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
          Turn Available Ingredients Into Delicious Recipes
        </h1>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '620px',
          margin: '0 auto'
        }}>
          A structured culinary generation engine powered by LLMs. Minimize food waste, explore customized meal ideas, and scale recipes seamlessly.
        </p>
      </header>

      <main style={{ padding: 'var(--space-8) 0' }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-secondary-subtle)',
            color: 'var(--color-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            margin: '0 auto var(--space-4)'
          }}>
            ✓
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 'var(--space-2)',
            color: 'var(--color-text-main)'
          }}>
            Phase 1: Project Initialization Complete
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)',
            maxWidth: '520px',
            margin: '0 auto var(--space-6)',
            lineHeight: 1.6
          }}>
            Vite + React environment configured, dependencies verified, and modular folder architecture successfully scaffolded. Standing by for Phase 2: Frontend UI Implementation.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            flexWrap: 'wrap'
          }}>
            <span style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)'
            }}>
              ⚛️ React 19 + Vite
            </span>
            <span style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)'
            }}>
              🎨 Modern Food-Tech CSS Tokens
            </span>
            <span style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)'
            }}>
              🛡️ Secure Server Architecture
            </span>
          </div>
        </div>
      </main>

      <footer style={{
        marginTop: 'auto',
        textAlign: 'center',
        padding: 'var(--space-6) 0',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        borderTop: '1px solid var(--color-border-subtle)'
      }}>
        Fridge-to-Recipe AI • Frontend Engineering Internship Project
      </footer>
    </div>
  )
}

export default App
