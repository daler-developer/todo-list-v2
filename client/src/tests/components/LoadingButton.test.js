import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoadingButton from 'components/LoadingButton'

describe('<LoadingButton />', () => {
  
  afterEach(() => {
    cleanup()
  })

  test('should render correctly', () => {
    render(
      <LoadingButton 
        isLoading={true}
        onClick={() => alert('daler')}
        className="button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    )

    expect(screen.getByRole('loading-button')).toBeInTheDocument()
    expect(screen.getByRole('loading-button')).toBeVisible()
  })
  
  test('className props should be added to root element', () => {
    render(
      <LoadingButton 
        isLoading={true}
        onClick={() => alert('daler')}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    )

    expect(screen.getByRole('loading-button')).toHaveClass('test-button')
  })

  test('"children" prop should be displayed inside button', () => {
    render(
      <LoadingButton 
        isLoading={false}
        onClick={() => alert('daler')}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    )

    expect(screen.queryByRole('loading-button-text')).toHaveTextContent('Click here')
  })

  test('function passes with "onClick" prop should be called when clicked', () => {
    const handleClick = jest.fn()

    render(
      <LoadingButton 
        isLoading={false}
        onClick={handleClick}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    )

    userEvent.click(screen.getByRole('loading-button'))

    expect(handleClick).toHaveBeenCalledTimes(1)

  })
  
  test('when "isLoading" equals "true", text should be hidden and spinner should appear', () => {
    render(
      <LoadingButton 
        isLoading={true}
        onClick={() => {}}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    )

    expect(screen.queryByRole('loading-button-text')).not.toBeInTheDocument()
    expect(screen.getByRole('loading-button-spinner')).toBeInTheDocument()
  })
  
  test('when "isLoading" equals "false", text should be visible and spinner should not', () => {
    render(
      <LoadingButton 
        isLoading={false}
        onClick={() => {}}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    )

    expect(screen.queryByRole('loading-button-spinner')).not.toBeInTheDocument()
    expect(screen.getByRole('loading-button-text')).toBeInTheDocument()
  })
  

})
