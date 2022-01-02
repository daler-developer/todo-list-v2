import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId
  },
  text: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const Task = mongoose.model('Task', taskSchema)

export default Task
