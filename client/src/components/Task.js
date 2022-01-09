import classNames from 'classnames'
import { useFormik } from 'formik'
import useOnClickOutside from 'hooks/useOnClickOutside'
import pt from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { tasksActions } from 'redux/reducers/tasksReducer'
import Icon from './Icon'


const Task = ({ data, className }) => {
  const [isMenuHidden, setIsMenuHidden] = useState(true)
  const [isEditFormHidden, setIsEditFormHidden] = useState(true)

  const menuRef = useRef(null)
  const editFormRef = useRef(null)
  const editTaskTextInputRef = useRef(null)

  const editForm = useFormik({
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
      await dispatch(tasksActions.updateTask({ id: data._id, props: { text } }))

      editForm.resetForm()
      setIsEditFormHidden(true)
    }
  })

  useOnClickOutside(editFormRef, () => {
    setIsEditFormHidden(true)
  }, [!isEditFormHidden])

  useEffect(() => {
    if (!isEditFormHidden) {
      editTaskTextInputRef.current?.focus()
    }
  }, [isEditFormHidden])

  useEffect(() => {
    if (!isEditFormHidden) {
      editForm.setValues({ text: data.text })
    }
  }, [isEditFormHidden])

  const dispatch = useDispatch()

  useOnClickOutside(menuRef, () => {
    setIsMenuHidden(true)
  }, [!isMenuHidden])

  const handleIsCompletedChange = (e) => {
    dispatch(tasksActions.updateTask({ id: data._id, props: { isCompleted: e.target.checked } }))
  }

  const closeMenu = () => setIsMenuHidden(true)

  const handleOpenMenuBtnClick = () => {
    if (isMenuHidden) {
      setIsMenuHidden(false)
    }
  }

  const handleDeleteBtnClick = () => {
    dispatch(tasksActions.deleteTask({ id: data._id }))

    closeMenu()
  }

  const handleEditTaskBtnClick = () => {
    setIsEditFormHidden(false)

    closeMenu()
  }

  return (
    <div className={classNames('task', { 'task--completed': data.isCompleted }, className )} role="task">
      

      <div className="task__body">

        <input 
          className="task__is-completed-checkbox"
          type="checkbox"
          checked={data.isCompleted}
          onChange={handleIsCompletedChange}
          role="task-checkbox"
        />

        {isEditFormHidden ? (
          <span className={classNames('task__text')} title={data.text} role="task-text">
            {data.text}
          </span>
        ) : (
          <form className="task__edit-task-form" onSubmit={editForm.handleSubmit} ref={editFormRef} role="task-edit-form">
            <input 
              type="text" 
              className={classNames('task__edit-task-input', { 'task__edit-task-input--error': editForm.touched.text && editForm.errors.text } )} 
              size={0}
              ref={editTaskTextInputRef}
              {...editForm.getFieldProps('text')}  
            />
          </form>
        )}

      </div>


      <div className="task__menu-btn-wrapper">

        <button className="task__open-menu-btn" onClick={handleOpenMenuBtnClick} role="task-open-menu-btn">
          <Icon
            children='more_vert'
          />
        </button>

        <div className={classNames('task__menu', { 'task__menu--hidden': isMenuHidden })} ref={menuRef} role="task-menu">


          <button className="task__menu-btn" type="button" onClick={handleEditTaskBtnClick} role="task-edit-btn">
            <Icon
              children="edit"
            />
            <span>Edit</span>
          </button>

          <button className="task__menu-btn" type="button" onClick={handleDeleteBtnClick}>
            <Icon
              children="delete"
            />
            <span>Delete</span>
          </button>

        </div>

      </div>


    </div>
  )
}

Task.propTypes = {
  data: pt.shape({
    _id: pt.string.isRequired,
    text: pt.string.isRequired,
    isCompleted: pt.bool.isRequired,
    creator: pt.string.isRequired
  }).isRequired,
  className: pt.string,
}

export default Task
