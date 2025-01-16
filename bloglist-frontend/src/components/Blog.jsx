import { useState } from 'react'

const Blog = ({ blog, handleLikeUpdate, handleDelete }) => {

  const [visible, setVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    await handleLikeUpdate(blog)
  }

  const removeBlog = async () => {
    // console.log("blogi:", {blog})
    if (window.confirm(`Poistetaanko blogi ${blog.title} ?`)) {
      // console.log("pyydetään handleDelete-funktiota päivittämään tieto sivulle")
      await handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div style={{ marginBottom: '2px' }}>{blog.url}</div>
          <div style={{ marginBottom: '2px' }}>
        likes {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          <div style={{ marginBottom: '2px' }}>{blog.user.name}</div>
          <button onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  )}

export default Blog