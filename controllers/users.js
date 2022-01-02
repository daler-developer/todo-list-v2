import jwt from 'jsonwebtoken'
import validator from 'express-validator'

import User from '../models/User.js'


export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Empty inputs' })
    }

    const candidate = await User.findOne({ username })

    if (!candidate) {
      return res.status(404).json({ message: 'User does not exist!' })
    }

    if (candidate.password !== password) {
      return res.status(400).json({ message: 'Invalid password!' })
    }

    const token = jwt.sign({ username: candidate.username }, 'secret_key', { expiresIn: '2 days' })

    return res.status(200).json({ 
      user: { _id: candidate._id, username: candidate.username }, 
      token 
    })

  } catch (e) {

    return res.status(500).json({ message: 'Unknown error' })

  }
}

export const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Empty token' })
    }

    let decoded

    try {
      decoded = jwt.verify(token, 'secret_key')
    } catch (e) {
      return res.status(400).json({ message: 'Incorrect token' })
    }

    const user = await User.findOne({ username: decoded.username })

    return res.status(200).json({ user: { _id: user._id, username: user.username } })

  } catch (e) {

    return res.status(500).json({ message: 'Unknown error' })

  }
}

export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Empty inputs' })
    }

    const candidate = await User.findOne({ username })

    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' })
    }

    const user = new User({ username, password })
    await user.save()

    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '2 days' })
  
    return res.status(201).json({ 
      user: { _id: user._id, username: user.username }, 
      token 
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Unknown error' })
  }
}
