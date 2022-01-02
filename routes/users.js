import express from 'express'
import validator from 'express-validator'

import { login, loginWithToken, register } from '../controllers/users.js'


const router = new express.Router()

router.post(
  '/login',
  [
    validator.body('username').trim().notEmpty(),
    validator.body('password').trim().notEmpty()
  ],
  login
)

router.post(
  '/login-with-token',
  [
    validator.body('token').trim().not().isEmpty(),
  ], 
  loginWithToken
)

router.post(
  '/register', 
  [
    validator.body('username').trim().not().isEmpty(),
    validator.body('password').trim().not().isEmpty()
  ],
  register
)

export default router
