import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'

const port = process.env.PORT || 6900

const app = express()
app.use(cors())
app.use(json())

app.get('/', (_req, res) => {
  return res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Server started on port 3000')
})
