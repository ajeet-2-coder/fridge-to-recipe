import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { generateRecipeHandler } from './server/api/generateRecipe.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const key = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY
  if (key && key !== 'undefined' && key !== 'your_gemini_api_key_here') {
    process.env.GEMINI_API_KEY = key
  }

  return {
    plugins: [
      react(),
      {
        name: 'vite-api-server-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/generate-recipe' && req.method === 'POST') {
              let body = ''
              req.on('data', (chunk) => {
                body += chunk
              })
              req.on('end', async () => {
                try {
                  const parsed = body ? JSON.parse(body) : {}
                  const result = await generateRecipeHandler(parsed)
                  res.setHeader('Content-Type', 'application/json')
                  res.statusCode = 200
                  res.end(JSON.stringify(result))
                } catch (err) {
                  res.setHeader('Content-Type', 'application/json')
                  res.statusCode = err.status || 500
                  res.end(JSON.stringify({ error: err.message || 'Error generating recipe' }))
                }
              })
              return
            }

            if (req.url === '/api/health' && req.method === 'GET') {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(
                JSON.stringify({
                  status: 'ok',
                  mode: 'vite-dev-middleware',
                  hasApiKey: Boolean(
                    process.env.GEMINI_API_KEY &&
                    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
                  )
                })
              )
              return
            }

            next()
          })
        }
      }
    ],
    server: {
      port: 5173
    }
  }
})
