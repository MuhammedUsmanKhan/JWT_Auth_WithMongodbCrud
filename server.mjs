import express from 'express'
import path from 'path'
const app = express()
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000

import JWTCrudRoutes from './JWT/main.mjs'

// app.use()

app.use(express.json())  // bodyParser

app.use('/JWT-Auth', JWTCrudRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})