import express from 'express'
import validator from 'express-validator'

import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.js'
import auth from '../middleware/auth.js'
import validation from '../middleware/validation.js'


const router = new express.Router()

router.get(
  '/',
  [auth],
  [
    validator.query('limit').toInt(),
  ], 
  [validation],
  getTasks
)

router.post(
  '/',
  [auth],
  [
    validator.body('text').trim().not().isEmpty(),
  ],
  [validation],
  createTask
)

router.delete(
  '/:id',
  [auth],
  [
    validator.param('id').trim().not().isEmpty(),
  ],
  [validation],
  deleteTask
)

router.put(
  '/:id',
  [auth],
  [
    validator.body('text').if(validator.body('text').exists())
      .trim().notEmpty()
    ,
    validator.body('isCompleted').if(validator.body('isCompleted').exists())
      .isBoolean()
    ,
    validator.body('creator').if(validator.body('creator').exists())
      .trim().notEmpty()
    ,
    validator.body('_id').if(validator.body('_id').exists())
      .custom((v) => Promise.reject('cannot set _id'))
    ,
  ],
  [validation],
  updateTask
)

export default router
