const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (body.title === undefined && body.url === undefined) {
    response.status(400).json(blog)
  }
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.remove()
      response.status(204).end()
    } 
    
    else {
      response.status(401).end()
    }

  } catch (error) {
    next(error)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
    
    try {
      
      await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.status(200).json(blog)
    
    } catch (error) {
      next(error)
    }}
  else {
    response.status(401).end()
  }
  
  
})

module.exports = blogsRouter