import express from 'express'
import resize from './api/resize'

const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Our main api route is working')
})

routes.use('/resize', resize)
export default routes
