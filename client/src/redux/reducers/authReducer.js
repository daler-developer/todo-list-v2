import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'utils/api'
import { uiActions } from './uiReducer'



const login = createAsyncThunk('auth/login', async ({ username, password, history }, thunkAPI) => {
  try {
    const { data } = await api.post('/users/login', {
      username, password
    })

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: 'Logged in' }))
  
    return { data }

  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))
    
    return thunkAPI.rejectWithValue({ data: e.response.data })

  }
})

const loginWithToken = createAsyncThunk('auth/login-with-token', async (token, thunkAPI) => {
  try {

    const { data } = await api.post('/users/login-with-token', {
      token
    })

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: 'Logged in' }))

    return { data }
    
  } catch (e) {

    // thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))
    
    return thunkAPI.rejectWithValue({ data: e.response.data })

  }
})

const register = createAsyncThunk('auth/register', async ({ username, password }, thunkAPI) => {
  try {
    
    const { data } = await api.post('/users/register', { username, password })

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: 'Registered' }))

    return { data }

  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))

    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const initialState = {
  currentUser: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.currentUser = payload
    },
    logout(state) {
      state.currentUser = null
    }
  },
  extraReducers: {
    [register.fulfilled](state, { payload }) {
      state.currentUser = payload.data.user
    },
    [loginWithToken.fulfilled](state, { payload }) {
      state.currentUser = payload.data.user
    },
    [login.fulfilled](state, { payload }) {
      state.currentUser = payload.data.user
    }
  }
})

export const selectCurrentUser = (state) => {
  return state.auth.currentUser
}

export const selectIsAuthenticated = (state) => {
  return Boolean(state.auth.currentUser)
}

export const authActions = authSlice.actions

authActions.login = login
authActions.loginWithToken = loginWithToken
authActions.register = register

export default authSlice.reducer
