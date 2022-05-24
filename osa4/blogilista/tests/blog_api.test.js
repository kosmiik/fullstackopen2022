const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are right amount of blogs', async () => {
  const blogsAtStart = await helper.blogsInDb()
  expect(blogsAtStart).toHaveLength(helper.blogs.length)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Reijon hieno ploki',
    author: 'Reijo',
    url: 'www.reijo.fi',
    likes: 8
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

  const title = blogsAtEnd.map(b => b.title)
  expect(title).toContain(
    'Reijon hieno ploki'
  )

})

test('blogs identification key is "id" and defined', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const id = blogsAtStart.map(b => b.id)
  expect(Object.keys(blogsAtStart[0])).toContain(
    'id'
  )
  expect(id).toBeDefined()
})

test('if "likes" is missing, it should be set to 0', async () => {
  const newBlog = {
    title: 'Ploki without likes',
    author: 'Björn',
    url: 'no.li.kes'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const last = (blogsAtEnd.length - 1)
  expect(blogsAtEnd[last].likes).toBe(0)
})

test('if title & url are missing, return 400 Bad Request', async () => {
  const newBlog = {
    author: 'Björn',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('test if it is possible to delete note', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  const blogs = blogsAtEnd.map(b => b.title)
  expect(blogs).not.toContain(blogToDelete.title)
  expect(blogsAtEnd).toHaveLength(
    helper.blogs.length -1
  )
})

test('test if we can update the existing blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  console.log(blogsAtStart[0].likes)
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: 100
  }


  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(100)
})

afterAll(() => {
  mongoose.connection.close()
})