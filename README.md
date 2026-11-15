# Fridge-to-Recipe AI

Fridge-to-Recipe helps you decide what to cook with ingredients you already have. Add items from your fridge, set optional meal preferences, and get a structured recipe with ingredients, cooking steps, and substitution ideas. You can adjust the serving count and keep track of your progress while cooking.

## Features

- **Ingredient entry:** Add items one at a time, enter comma-separated ingredients, or use the quick-add suggestions.
- **Recipe preferences:** Choose a dietary style, meal type, and maximum cooking time.
- **Structured generation:** Get recipe details such as cuisine, difficulty, preparation and cooking time, ingredients, and instructions.
- **Cooking companion:** Check off ingredients and steps as you go, and see step completion progress.
- **Flexible portions:** Scale ingredient quantities for a different serving count.
- **Substitution suggestions:** Review alternatives and apply a suggested swap in the recipe view.
- **Demo mode:** Try the app without a Gemini key using the built-in fallback recipe generator.

## How it works

1. Enter ingredients and optional preferences in the React interface.
2. The frontend sends them to the `/api/generate-recipe` endpoint.
3. The server uses Gemini structured output when `GEMINI_API_KEY` is configured. Otherwise, it creates a basic demo recipe.
4. The frontend validates the returned recipe data before displaying it.
5. Serving scaling, ingredient checks, applied swaps, and cooking-step progress are managed in the browser.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | React 19, Vite 8 |
| Styling | CSS modules by component and shared global styles |
| API | Node.js, Express 5 |
| Recipe generation | Google Gemini `gemini-2.5-flash` structured JSON output, with a local demo fallback |
| Code checks | Oxlint |

## Getting started

### Requirements

- Node.js 18 or later and npm
- A Gemini API key for live recipe generation (optional)

### Install dependencies

```bash
npm install
```

### Configure Gemini (optional)

Create a `.env` file in the project root and add your key:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep the key in the server environment. Do not add it to frontend code or commit your `.env` file. If the key is absent or is the example placeholder, the app uses demo mode.

### Start the development app

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`. The Vite development configuration provides the recipe API middleware, so this is the only process needed for local development.

### Build and check

```bash
npm run build
npm run lint
```

To preview the production frontend build locally, run `npm run preview` after building. The project also includes `npm run server` to start the standalone Express API on port `5000`; the default frontend API path in development uses Vite's middleware.

## Using the app

1. Add ingredients by typing them and selecting **Add** or pressing Enter. Separate multiple ingredients with commas, or choose quick-add suggestions.
2. Remove an ingredient or select **Clear All** to edit the list.
3. Select any available dietary preference, meal type, or cooking-time limit.
4. Select **Generate Structured Recipe** and wait for the recipe to appear.
5. Adjust the serving count, mark ingredients as prepared, check off completed steps, or apply a substitution.
6. Start another recipe from the recipe view when you are ready.

The app includes sample ingredient baskets in the empty state for a quick trial.

## Project structure

```text
.
├── index.html
├── vite.config.js                 # Vite setup and development API middleware
├── server/
│   ├── server.js                  # Standalone Express API server
│   └── api/
│       └── generateRecipe.js      # Gemini request and demo fallback
└── src/
    ├── App.jsx                    # Main application layout
    ├── hooks/
    │   └── useRecipe.js           # Recipe and cooking session state
    ├── services/
    │   └── recipeService.js       # Frontend API request and response validation
    ├── utils/
    │   ├── validateRecipe.js      # Recipe response validation
    │   └── scaleIngredients.js    # Serving quantity scaling
    ├── components/                # Ingredient, recipe, and cooking UI
    └── styles/
        └── global.css             # Shared styling and design tokens
```

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/generate-recipe` | Accepts ingredients, dietary preference, meal type, time limit, and target servings; returns a recipe or an error. |
| `GET` | `/api/health` | Returns a basic server health response and whether an API key is configured. |

## AI usage

The recipe feature sends the submitted ingredients and preferences to Google Gemini when a server-side `GEMINI_API_KEY` is available. It requests structured JSON to match the recipe fields used by the interface. Without a configured key, the server returns a deterministic demo recipe; that fallback is not AI-generated. AI assistance was also used for a basic code check by running the project's linter, which completed without reporting issues. A clean lint run does not guarantee the app is free of bugs.

## Limitations

- Generated recipes, substitutions, time estimates, and nutrition values may be inaccurate. Verify food safety, allergens, dietary requirements, and doneness independently.
- Demo mode uses a simple fallback recipe and does not fully honor dietary, meal, or time preferences.
- Proportional quantity scaling may not suit every ingredient or recipe, especially seasoning.
- Recipe data and cooking progress are held in the current browser session; there is no account or persistence layer.
- Live generation needs internet access, a valid Gemini API key, and available provider quota.
- The standalone Express server and Vite development middleware are separate ways to serve the API; production hosting needs to provide both the built frontend and an API server.

## Time spent

Not tracked for this project, so a reliable total is unavailable.
