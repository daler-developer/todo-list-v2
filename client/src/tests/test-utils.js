import { Provider } from "react-redux"
import { render } from '@testing-library/react'
import store from "redux/store"


const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

const customRender = (ui, options) => {
  return render(ui, {wrapper: Wrapper, ...options})
}

export { customRender }
