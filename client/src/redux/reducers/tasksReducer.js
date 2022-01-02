import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'utils/api'
import { uiActions } from './uiReducer'


const loadTasks = createAsyncThunk('tasks/loadTasks', async (options, thunkAPI) => {
  try {
    const { data } = await api.get(`/tasks`)

    console.log('data', data)

    return { data }

  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))

    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const createTask = createAsyncThunk('tasks/createTask', async (text, thunkAPI) => {
  try {
    const { data } = await api.post(`/tasks`, { text })

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: 'Created new task' }))

    return { data }

  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))

    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, props }, thunkAPI) => {
  try {
    const { data } = await api.put(`/tasks/${id}`, props)

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: 'Updated task' }))

    return { data }

  } catch (e) {
    console.log(e)
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))

    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ id }, thunkAPI) => {
  try {
    const { data } = await api.delete(`/tasks/${id}`)

    thunkAPI.dispatch(uiActions.openAlert({ type: 'success', text: 'Deleted task' }))

    return { data, deletedTaskId: id }

  } catch (e) {
    thunkAPI.dispatch(uiActions.openAlert({ type: 'error', text: e.response.data.message }))

    return thunkAPI.rejectWithValue({ data: e.response.data })
  }
})

const initialState = {
  list: [],
  fetchingStatus: 'idle', // 'loading' 'loaded' 'idle' 'error'
  editingTaskId: null
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, { payload }) {
      state.list = payload
    },
    setFetchingStatus(state, { payload }) {
      state.fetchingStatus = payload
    }
  },
  extraReducers: {
    [loadTasks.pending](state, { payload }) {
      state.fetchingStatus = 'loading'
    },
    [loadTasks.fulfilled](state, { payload }) {
      state.list = payload.data.tasks
      state.fetchingStatus = 'loaded'
    },
    [loadTasks.rejected](state, { payload }) {
      state.fetchingStatus = 'rejected'
    },
    [createTask.fulfilled](state, { payload }) {
      state.list.push(payload.data.task)
    },
    [updateTask.fulfilled](state, { payload }) {
      const index = state.list.findIndex((task) => task._id === payload.data.task._id)
      state.list[index] = payload.data.task
    },
    [deleteTask.fulfilled](state, { payload }) {
      const index = state.list.findIndex((task) => task._id === payload.deletedTaskId)
      state.list.splice(index, 1)
    }
  }
})

export const selectTasks = (state) => {
  return state.tasks.list
}

export const selectEditingTaskId = (state) => {
  return state.tasks.editingTaskId
}

export const selectTaskById = (state, id) => {
  return state.tasks.list.find((task) => task._id === id)
}

export const selectTasksFetchingStatus = (state) => {
  return state.tasks.fetchingStatus
}

export const tasksActions = tasksSlice.actions

tasksActions.loadTasks = loadTasks
tasksActions.createTask = createTask
tasksActions.updateTask = updateTask
tasksActions.deleteTask = deleteTask

export default tasksSlice.reducer
