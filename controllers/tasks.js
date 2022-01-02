import validator from 'express-validator'

import Task from '../models/Task.js'


export const createTask = async (req, res) => {
  try {

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid inputs' })
    }

    const { text } = req.body

    const task = new Task({ creator: req.user._id, text })

    await task.save()

    return res.status(201).json({ task })
    
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getTasks = async (req, res) => {
  try {
    const { limit } = req.query
    
    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid inputs' })
    }

    const tasks = Task.find({ creator: req.user._id })
    
    if (limit) {
      tasks.limit(limit)
    }

    tasks.exec((e, result) => {
      if (e) {
        console.log(e)
        return res.status(500).json({ message: 'Invalid inputs' })
      }
      return res.status(200).json({ tasks: result })
    })

  } catch (e) { 
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteTask = async (req, res) => {
  try {

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid inputs' })
    }
    
    const { id } = req.params

    try {
      await Task.deleteOne({ _id: id })
    } catch (e) {
      return res.status(500).json({ message: 'Cannot delete task' })
    }

    res.status(203).json({})
    
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateTask = async (req, res) => {
  try {

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid inputs' })
    }
    
    const { id } = req.params
    const body = req.body

    try {
      await Task.updateOne({ _id: id }, { ...body }) 
    } catch (e) {
      return res.status(500).json({ message: 'Cannot save task' })
    }
    
    const updated = await Task.findOne({ _id: id })

    return res.status(203).json({ task: updated })
    
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}
