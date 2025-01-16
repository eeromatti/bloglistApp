import { Router } from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const testingRouter = Router()

testingRouter.post('/reset', async (request, response) => {
  console.log('routen kutsu onnistuu')
  await Blog.deleteMany({})
  response.status(204).end()
})

export default testingRouter