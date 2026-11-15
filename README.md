# 🍳 Fridge-to-Recipe AI

A modern, structured web application built with **React**, **Vite**, and **LLM API integration** that helps home cooks transform available ingredients in their fridge into delicious, step-by-step recipes with scalable servings and smart ingredient swaps.

> **Note:** This project is intentionally designed as an interactive, structured recipe generation tool—**not a conversational chatbot**.

---

## 🚀 Technology Stack

- **Frontend:** React 19 (Functional Components, Hooks), Vite 8
- **Styling:** Modular CSS with custom food-tech design tokens (warm terracotta, sage, warm linen)
- **Backend / API:** Node.js server route (`server/api/generateRecipe.js`)
- **LLM Integration:** Structured JSON schema prompting via private server-side API key
- **Version Control:** Git & GitHub

---

## 📁 Project Architecture & Folder Structure

```text
fridge_to_recipe/
├── .env.example                # Environment variables template (API keys, ports)
├── .gitignore                  # Git ignore rules (protects credentials and builds)
├── index.html                  # HTML entry point with food-tech typography
├── package.json                # Project dependencies and operational scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Project documentation
│
├── server/                     # Backend API layer (keeps LLM credentials secure)
│   └── api/
│       └── generateRecipe.js   # Recipe generation endpoint controller
│
└── src/                        # Frontend application source
    ├── assets/                 # Static media and brand assets
    ├── components/             # Modular, single-responsibility UI components
    │   ├── IngredientInput/    # Input field, tag management, quick-add chips
    │   ├── RecipeView/         # Parent presentation view for generated recipe
    │   ├── RecipeCard/         # Recipe metadata header (time, difficulty, cuisine)
    │   ├── CheckableSteps/     # Interactive cooking step progression
    │   ├── ScalableServings/   # Serving size adjustment stepper
    │   ├── IngredientList/     # Dynamic ingredient list with scaled measurements
    │   ├── IngredientSwap/     # Smart substitutions for missing ingredients
    │   ├── LoadingState/       # Culinary-themed loading animation & tips
    │   ├── ErrorState/         # Actionable error handling & retry interface
    │   └── EmptyState/         # Welcoming empty state with sample ingredient baskets
    │
    ├── hooks/                  # Custom React hooks for business logic
    │   └── useRecipe.js        # State machine managing recipe generation & scaling
    │
    ├── services/               # Client-side API abstraction layer
    │   └── recipeService.js    # Client service communicating with backend
    │
    ├── utils/                  # Pure utility functions
    │   ├── validateRecipe.js   # JSON schema validation for LLM responses
    │   └── scaleIngredients.js # Proportional ingredient measurement scaling
    │
    ├── styles/                 # Global design system
    │   └── global.css          # CSS variables, typography, reset & food-tech theme
    │
    ├── App.jsx                 # Top-level application shell
    └── main.jsx                # React DOM root entry point
```

---

## 🧱 Architectural Breakdown

| Folder / File | Responsibility |
| :--- | :--- |
| `src/components/` | Individual UI components. Each component is isolated in its own directory with an `index.js` re-export for clean modular imports. |
| `src/hooks/` | Custom hooks (e.g. `useRecipe.js`) that encapsulate business logic, serving multipliers, step completion state, and API orchestration away from UI views. |
| `src/services/` | Network layer handling requests to the backend server. Enforces separation of concerns so UI never interacts directly with low-level network calls. |
| `src/utils/` | Deterministic pure helper functions for recipe data schema validation and dynamic serving scale mathematics. |
| `src/styles/` | Global CSS custom properties declaring design tokens (colors, radii, shadows, typography) for a cohesive modern food-tech aesthetic. |
| `server/` | Isolated Node.js backend layer guaranteeing that API keys are never exposed in client bundle code. |

---

## 🛠️ How to Run Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended, tested on Node v24)
- **npm** (v9 or higher)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd fridge_to_recipe
npm install
```

### 2. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env
```
*(On Windows PowerShell, use `Copy-Item .env.example .env`)*

### 3. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

### 4. Build for Production
To test production bundling and build integrity:
```bash
npm run build
npm run preview
```

---

## 🔒 Security Principles
- **No Client-Side Secrets:** Gemini / LLM API keys are never bundled into client JavaScript.
- **Strict Response Validation:** All incoming LLM outputs are validated against a structured recipe schema in `validateRecipe.js` before being passed to UI components.
- **Git Hygiene:** `.env` and sensitive local files are strictly excluded via `.gitignore`.
