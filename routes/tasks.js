import express from 'express'
import validator from 'express-validator'

import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.js'
import auth from '../middleware/auth.js'


const router = new express.Router()

router.get(
  '/',
  [
    validator.query('limit').toInt(),
  ], 
  [auth],
  getTasks
)

router.post(
  '/',
  [
    validator.body('text').trim().not().isEmpty(),
  ],
  [auth],
  createTask
)

router.delete(
  '/:id',
  [
    validator.param('id').trim().not().isEmpty(),
  ],
  [auth],
  deleteTask
)

router.put(
  '/:id',
  [],
  [auth],
  updateTask
)

export default router
