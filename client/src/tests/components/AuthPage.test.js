import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthPage from 'components/AuthPage'
import { customRender } from 'tests/test-utils'


describe('<AuthPage />', () => {

  beforeEach(() => {
    customRender(<AuthPage />)
  })

  afterEach(() => {
    cleanup()
  })

  test('should render correctly', () => {
    expect(screen.getByRole('auth-page')).toBeInTheDocument()
    expect(screen.getByRole('auth-page')).toBeVisible()
  })

  test('title should be "Register" when in register tab', () => {
    expect(screen.getByRole('auth-page-title')).toHaveTextContent('Register')
  })
  
  test('title should be "Login" when in login tab', () => {
    userEvent.click(screen.getByRole('auth-page-switch-to-login'))

    expect(screen.getByRole('auth-page-title')).toHaveTextContent('Login')
  })
  

  test('inputs should work correctly', () => {
    const username = screen.getByRole('auth-page-username-input')
    const password = screen.getByRole('auth-page-password-input')
    
    userEvent.type(username, 'daler')
    userEvent.type(password, '2000909k')

    expect(username).toHaveValue('daler')
    expect(password).toHaveValue('2000909k')
  })
  
})

