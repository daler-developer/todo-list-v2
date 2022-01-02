import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import tasksReducer from "./reducers/tasksReducer"
import uiReducer from "./reducers/uiReducer"


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    tasks: tasksReducer
  }
})

export default store
