import { cleanup, screen } from "@testing-library/react"
import Task from "components/Task"
import { customRender } from "tests/test-utils"
import userEvent from '@testing-library/user-event'


describe('<Task />', () => {
  
  afterEach(() => {
    cleanup()
  })

  test('should render correctly', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: true,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task')).toBeInTheDocument()
  })

  test('class should be generated properly', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: true,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task')).toHaveClass('task task--completed first-task', { exact: true })

    cleanup()

    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: false,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task')).toHaveClass('task first-task', { exact: true })
  })
  

  test('text should be displayed normally', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: true,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task-text')).toHaveTextContent('Hello World')
  })

  test('checkbox should be checked when task is completed', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: true,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task-checkbox')).toBeChecked()
  })
  
  test('checkbox should be unchecked when task is not completed', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: false,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task-checkbox')).not.toBeChecked()
  })
  
  test('poppup menu should be hidden and shown after clicking menu btn', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: false,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.getByRole('task-menu')).toHaveClass('task__menu--hidden')

    userEvent.click(screen.getByRole('task-open-menu-btn'))

    expect(screen.getByRole('task-menu')).not.toHaveClass('task__menu--hidden')
  })

  test('edit task form should be invisible and should appear when clicking "edit" btn', () => {
    customRender(<>
      <Task
        data={{
          _id: 'id001',
          text: 'Hello World',
          isCompleted: false,
          creator: 'creatorid001'
        }}
        className="first-task"
      />
    </>)

    expect(screen.queryByRole('task-edit-form')).toBeNull()

    userEvent.click(screen.getByRole('task-open-menu-btn'))
    userEvent.click(screen.getByRole('task-edit-btn'))

    expect(screen.queryByRole('task-edit-form')).toBeTruthy()
  })
  
})

