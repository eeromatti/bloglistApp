// bloglistApp
//testest

import { MONGODB_URI, PORT } from './utils/config.js'
import express from 'express'
const app = express()
import cors from 'cors'
import 'express-async-errors'
import mongoose from 'mongoose'

import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'
import { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor } from './utils/middleware.js'
import { info, error } from './utils/logger.js'

mongoose.set('strictQuery', false)

info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
// if (process.env.NODE_ENV === 'test') {
app.use('/api/testing', testingRouter)
// }

app.use(unknownEndpoint)
app.use(errorHandler)

export default app