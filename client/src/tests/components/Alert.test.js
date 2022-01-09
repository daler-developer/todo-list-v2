import Alert from "components/Alert"
import { cleanup, screen } from '@testing-library/react'
import { customRender } from "tests/test-utils"
import store from "redux/store"
import { uiActions } from "redux/reducers/uiReducer"


describe('<Alert />', () => {

  afterEach(() => {
    cleanup()
  })

  test('should be in the document', () => {
    customRender(<Alert />)

    expect(screen.getByRole('alert-box')).toBeInTheDocument()
  })
  
  test('should show error message correctly', () => {
    customRender(<Alert />)

    store.dispatch(uiActions.openAlert({ type: 'error', text: 'Cannot create post' }))

    expect(screen.getByRole('alert-box')).toHaveClass('alert alert--error')
    expect(screen.getByRole('alert-box')).toHaveTextContent('Cannot create post')
  })
  
  test('should show success properly', () => {
    customRender(<Alert />)

    store.dispatch(uiActions.openAlert({ type: 'success', text: 'Created post' }))

    expect(screen.getByRole('alert-box')).toHaveClass('alert alert--success')
    expect(screen.getByRole('alert-box')).toHaveTextContent('Created post')
  })
  

  test('should be hidden properly when dispatched action', () => {
    customRender(<Alert />)

    store.dispatch(uiActions.closeAlert())

    expect(screen.getByRole('alert-box')).toHaveClass('alert alert--hidden')
  })
  
})

