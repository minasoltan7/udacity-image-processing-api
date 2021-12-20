import express from 'express'
import resize from './api/resize'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('our main api route is working')
})

routes.use('/resize', resize)
export default routes
