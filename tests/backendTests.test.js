import { test, after, describe, beforeEach } from 'node:test'

import mongoose from 'mongoose'
import supertest from 'supertest'
import assert from 'assert'
import app from '../app.js'
import { blogsInDb, usersInDb } from './helper.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const api = supertest(app)

describe('number and type', () => {
  test('blogs are returned as json', async () => {
    const allBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('adding a blog')
test('a blog can be added', async () => {
  const allBlogs = await api.get('/api/blogs')
  const currentNumber = allBlogs.body.length
  const allUsers = await api.get('/api/users')
  const firstUser = allUsers.body[0]

  const newBlog = {
    author: 'testaaja',
    title: 'testaus',
    url: 'testi.fi/',
    likes: 0,
    user: firstUser.id
  }

  const userForToken = {
    username: firstUser.username,
    id: firstUser.id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogsNew = await api.get('/api/blogs')
  const newNumber = allBlogsNew.body.length
  assert.strictEqual(newNumber, currentNumber+1)
})

describe('deleting and modifying single blogs')
test('delete the last blog', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogsNumberStart = blogsAtStart.body.length
  const blogToDelete = blogsAtStart.body[blogsNumberStart-1]
  const allUsers = await api.get('/api/users')
  const firstUser = allUsers.body[0]
  // console.log("number start:", blogsNumberStart)

  const userForToken = {
    username: firstUser.username,
    id: firstUser.id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  const blogsNumberEnd = blogsAtEnd.body.length
  // console.log("number end:", blogsNumberEnd)
  assert.strictEqual(blogsNumberStart, blogsNumberEnd+1)
})

after(async () => {
  await mongoose.connection.close()
})


