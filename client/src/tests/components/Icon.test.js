import Icon from "components/Icon"
import { cleanup, render, screen } from '@testing-library/react'

describe('<Icon />', () => {

  afterEach(() => {
    cleanup()
  })

  test('"children" prop should be rendered inside root element', () => {
    render(<Icon children="person" />)

    expect(screen.getByRole('icon')).toHaveTextContent('person')
  })
  

  test('should render correctly', () => {
    render(<Icon children="person" />)

    expect(screen.getByRole('icon')).toBeInTheDocument()
    expect(screen.getByRole('icon')).toBeVisible()
  })

  test('material-icons-outlined class should be generated by default without passing "variant" prop', () => {
    render(<Icon children="person" />)

    expect(screen.getByRole('icon')).toHaveClass('icon material-icons-outlined')
  })
  

  test('material-icons-outlined class should be generated properly', () => {
    render(<Icon children="person" variant="outlined" />)

    expect(screen.getByRole('icon')).toHaveClass('icon material-icons-outlined')
  })
  
  test('material-icons-filled class should be generated properly', () => {
    render(<Icon children="person" variant="filled" />)

    expect(screen.getByRole('icon')).toHaveClass('icon material-icons-filled')
  })
  
})

