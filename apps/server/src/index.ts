import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { productsRoute } from './routes/products'
import { collectionsRoute } from './routes/collections'
import { logErrors } from './middlewares/logMiddleware'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

productsRoute(app)
collectionsRoute(app)

app.use(logErrors)

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
