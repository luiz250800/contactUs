import express from 'express'
import cors from 'cors'
import routes from './routes'
import dotenv from 'dotenv'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.set(
  'twig options',
  {
    allow_async: true,
    strict_variables: false
  }
)

dotenv.config()

console.log('\x1b[33m-Starting servers --------------------')
app.listen(
  process.env.PORT || 3333,
  () => {
    console.log('\x1b[32m-Server express started on port 3333. \x1b[0m')
  }
).on(
  'error',
  (error) => {
    console.log(`\x1b[31m-Error connecting to Express server: ${error} \x1b[0m`)
  }
)
