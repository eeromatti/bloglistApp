import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

//   test('clicking the button calls event handler once', async () => {
//     const blog = {
//       title: 'Component testing is done with react-testing-library',
//       author: 'Seppo',
//       url: 'seppo.fi',
//       user:
//       {
//         name: 'pasi'
//       }
//     }

//     render(
//       <Blog blog={blog} />
//     )
//     const user = userEvent.setup()
//     const button = screen.getByText('view')

//     await user.click(button)

//     expect(screen.getByText('seppo.fi')).toBeDefined()
//     expect(screen.getByText('likes')).toBeDefined()
//     expect(screen.getByText('pasi')).toBeDefined()
//   })


