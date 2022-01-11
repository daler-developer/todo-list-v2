import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoadingButton from 'components/LoadingButton'

describe('<LoadingButton />', () => {

  let loadingBtn
  let handleClick = jest.fn()

  beforeEach(() => {
    loadingBtn = render(
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
  })
  
  afterEach(() => {
    cleanup()
  })

  test('button should be disables when "isLoading" is true, otherwise false', () => {
    loadingBtn.rerender(<>
      <LoadingButton
        isLoading={true}
        onClick={handleClick}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    </>)

    expect(screen.getByRole('loading-button').disabled).toEqual(true)

    loadingBtn.rerender(<>
      <LoadingButton
        isLoading={false}
        onClick={handleClick}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    </>)

    expect(screen.getByRole('loading-button').disabled).toEqual(false)
  })
  

  test('should render correctly', () => {
    expect(screen.getByRole('loading-button')).toBeInTheDocument()
    expect(screen.getByRole('loading-button')).toBeVisible()
  })
  
  test('"className" props should be added to root element', () => {
    expect(screen.getByRole('loading-button')).toHaveClass('loading-button test-button')
  })

  test('"type" prop should be added to root element', () => {
    expect(screen.getByRole('loading-button').type).toEqual('submit')
  })
  
  test('"children" prop should be displayed inside button', () => {
    expect(screen.queryByRole('loading-button-text')).toHaveTextContent('Click here')
  })

  test('function passes with "onClick" prop should be called when clicked', () => {
    userEvent.click(screen.getByRole('loading-button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  test('when "isLoading" equals "true", text should be hidden and spinner should appear', () => {
    loadingBtn.rerender(<>
      <LoadingButton
        isLoading={true}
        onClick={handleClick}
        className="test-button"
        type="submit"
        restProps={{ root: { title: 'hello daler' } }}
      >
        Click here
      </LoadingButton>
    </>)

    expect(screen.queryByRole('loading-button-text')).not.toBeInTheDocument()
    expect(screen.getByRole('loading-button-spinner')).toBeInTheDocument()
  })
  
  test('when "isLoading" equals "false", text should be visible and spinner should not', () => {
    expect(screen.queryByRole('loading-button-spinner')).not.toBeInTheDocument()
    expect(screen.getByRole('loading-button-text')).toBeInTheDocument()
  })

})
