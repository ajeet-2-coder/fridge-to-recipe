import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { generateRecipeHandler } from './api/generateRecipe.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here')
  })
})

// Recipe generation endpoint
app.post('/api/generate-recipe', async (req, res) => {
  try {
    const recipe = await generateRecipeHandler(req.body)
    res.json(recipe)
  } catch (err) {
    const statusCode = err.status || 500
    res.status(statusCode).json({
      error: err.message || 'An unexpected error occurred while generating the recipe.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`[Server] Fridge-to-Recipe API running on http://localhost:${PORT}`)
})
