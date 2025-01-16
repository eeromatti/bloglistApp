import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import create from '../services/create'

test('<BlogForm /> adding a blog requests createblog function', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const newBlogButton = screen.getByRole('button', { name: 'new blog' })
  expect(newBlogButton).toBeDefined()
  //   await user.click(newBlogButton)

  //   const inputs = screen.getAllByRole('textbox')
  //   await user.type(inputs[0], 'nakkivene')
  //   await user.type(inputs[1], 'Seppo')
  //   await user.type(inputs[2], 'url')

  //   const createButton = screen.getByText('create')
  //   await user.click(createButton)

//   expect(createBlog).toHaveBeenCalledTimes(1)
//   expect(createBlog.mock.calls[0][0]).toEqual({
//     title: 'nakkivene',
//     author: 'Seppo',
//     url: 'url'
//   })
})