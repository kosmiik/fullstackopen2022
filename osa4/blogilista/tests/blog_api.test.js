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

describe('Testing post/delete-method with token...', () => {
  
  let token

  beforeEach(async () => {
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const getResult = await api
      .post('/api/login')
      .send(newUser)

    token = {
      'Authorization': `bearer ${getResult.body.token}`
    }
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Reijon hieno ploki',
      author: 'Reijo',
      url: 'www.reijo.fi',
      likes: 8,
      userId: '62912312cef07afef5a9a752'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain(
      'Reijon hieno ploki'
    )

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
      .set(token)
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
      .set(token)
      .expect(400)
  })
  
  test('test if it is possible to delete blog', async () => {
    const newBlog = {
      title: 'Jannen Testiploki',
      author: 'Janne',
      url: 'www.jan.ne',
      likes: 81,
      userId: '62912312cef07afef5a9a752'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsNow = await helper.blogsInDb()
    const blogToDelete = blogsNow.find(b => b.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(token)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    const blogs = blogsAtEnd.map(b => b.title)
    expect(blogs).not.toContain(blogToDelete.title)
    expect(blogsNow).toHaveLength(
      helper.blogs.length + 1
    )
  })

  test('test if we can update the existing blog', async () => {
    const newBlog = {
      title: 'Jannen Testiploki',
      author: 'Janne',
      url: 'www.jan.ne',
      likes: 81,
      userId: '62912312cef07afef5a9a752'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(token)
      .expect(201)

    const blogsNow = await helper.blogsInDb()
    const blogToUpdate = blogsNow.find(b => b.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set(token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
  })

})

describe('Testing some blog format things...', () => {
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

  test('blogs identification key is "id" and defined', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart.map(b => b.id)
    expect(Object.keys(blogsAtStart[0])).toContain(
      'id'
    )
    expect(id).toBeDefined()
  })

})

afterAll(() => {
  mongoose.connection.close()
})