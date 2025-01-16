import bcrypt from 'bcryptjs'
import { Router } from 'express'
import User from '../models/user.js'
import Blog from '../models/blog.js'

const usersRouter = Router()


usersRouter.get('/', async (request,response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})


usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response.status(400).json({ error: 'password cannot be shorter than the minimum allowed length (3)' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})


export default usersRouter