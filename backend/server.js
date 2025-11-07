import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from './routes/index.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'Ydays backend running' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
