import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Creator is require']
  },
  text: {
    type: String,
    required: [true, 'Text is require']
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: [true, 'isCompleted is require']
  }
})

const Task = mongoose.model('Task', taskSchema)

export default Task
