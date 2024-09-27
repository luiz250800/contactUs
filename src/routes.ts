import { Request, Response, Router } from 'express'
import genericRoutes from './routes/genericRoutes'

const routes = Router()

routes.use(
  '/api/',
  genericRoutes
)

routes.use((request: Request, response: Response) => {
  response.sendStatus(404)
})

export default routes
