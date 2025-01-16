import { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs }) => {

  // useEffect(() => {
  //   console.log('Blogs changed:', blogs);
  // }, [blogs]);

  const handleDelete = async (id) => {
    console.log('handleDelete received a request')
    await blogService.remove(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
  }

  const handleLikeUpdate = async (blog) => {
    console.log('handleLikeUpdate received a request')
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
    // console.log('updatedBlogs:', updatedBlogs)
    setBlogs(updatedBlogs)
  }

  return (
    <div>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          handleLikeUpdate={handleLikeUpdate}
        />
      )}
    </div>
  )
}

export default BlogList