import { Provider } from "react-redux"
import { render } from '@testing-library/react'
import store from "redux/store"
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min"


const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}

const customRender = (ui, options) => {
  return render(ui, {wrapper: Wrapper, ...options})
}

export { customRender }
