import Icon from "components/Icon"
import Task from "components/Task"
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { authActions, selectCurrentUser } from "redux/reducers/authReducer"
import { selectTasks, selectTasksFetchingStatus, tasksActions } from "redux/reducers/tasksReducer"
import useOnClickOutside from "hooks/useOnClickOutside"
import classNames from "classnames"


const HomePage = () => {
  const [isCreateTaskFormHidden, setIsCreateTaskFormHidden] = useState(true)
  const [searchInputValue, setSearchInputValue] = useState('')

  const createTaskFormRef = useRef(null)
  const createTaskTextInput = useRef(null)

  useOnClickOutside(createTaskFormRef, () => {
    setIsCreateTaskFormHidden(true)
    createTaskForm.resetForm()
  }, [!isCreateTaskFormHidden])

  const createTaskForm = useFormik({
    initialValues: {
      text: ''
    },
    validate(v) {
      const errors = {}

      if (!v.text.trim()) {
        errors.text = 'Empty text'
      }

      return errors
    },
    async onSubmit({ text }) {
      await dispatch(tasksActions.createTask(text))

      createTaskForm.resetForm()
    }
  })

  const dispatch = useDispatch()

  const currentUser = useSelector((state) => selectCurrentUser(state))

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    if (!isCreateTaskFormHidden) {
      createTaskTextInput.current.focus()
    }
  }, [isCreateTaskFormHidden])

  const tasks = useSelector((state) => selectTasks(state))
  const fetchingStatus = useSelector((state) => selectTasksFetchingStatus(state))

  const loadTasks = async () => {
    dispatch(tasksActions.loadTasks())
  }

  const getFilteredTasks = () => {
    return tasks.filter((task) => task.text.includes(searchInputValue))
  }

  const handleLogoutBtnClick = () => {
    dispatch(authActions.logout())

    localStorage.setItem('auth-token', null)
  }

  const handleCreateTaskBtnClick = () => {
    setIsCreateTaskFormHidden(false)
  }

  const handleRefreshTasksBtnClick = () => {
    loadTasks()
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="home-page">
      <div className="home-page__main">


        <div className="home-page__header">

          <h1 className="home-page__title">
            TodoList
          </h1>

          <button className="home-page__logout-btn" onClick={handleLogoutBtnClick}>
            <Icon
              children="logout"
            />
          </button>

        </div>


        <div className="home-page__body">

          <input 
            type="text" 
            className="home-page__search-input"
            placeholder="Search task" 
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />

          {fetchingStatus === 'loading' && (
            <div className="home-page__loader" />
          )}

          {fetchingStatus === 'loaded' && tasks.length === 0 && (
            <div className="home-page__no-tasks-info">
              No tasks
            </div>
          )}

          <div className="home-page__tasks-list">
            {getFilteredTasks().map((task) => (
              <Task
                key={task._id}
                data={task}
              />
            ))}
          </div>

          {!isCreateTaskFormHidden && (
            <form onSubmit={createTaskForm.handleSubmit} className="home-page__create-task-form" ref={createTaskFormRef}>
              <input 
                type="text" 
                className={classNames('home-page__create-task-text-input', { 'home-page__create-task-text-input--error': createTaskForm.touched.text && createTaskForm.errors.text })} 
                placeholder="Enter task..."
                ref={createTaskTextInput}
                {...createTaskForm.getFieldProps('text')}
              />
            </form>
          )}

        </div>

        
        <div className="home-page__footer">
          
          <div className="home-page__footer-left">

            <button type="button" className="home-page__footer-btn" onClick={handleCreateTaskBtnClick} title="create new task">
              <Icon
                children="add"
              />
            </button>

            <button type="button" className="home-page__footer-btn" onClick={handleRefreshTasksBtnClick} title="refetch tasks">
              <Icon
                children="refresh"
              />
            </button>

          </div>
          
          <div className="home-page__footer-right">
            <span className="home-page__tasks-left-info">
              {tasks.filter((task) => task.isCompleted).length}/{tasks.length}
            </span>
          </div>


        </div>


      </div>
    </div>
  )
}

export default HomePage
