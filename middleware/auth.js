import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export default async (req, res, next) => {
  const token = req.get('auth-token')

  if (!token) {
    return res.status(400).json({ message: 'Not authenticated' })
  }

  try {
    const decoded = jwt.verify(token, 'secret_key') 

    const user = await User.findOne({ username: decoded.username })

    req.user = user

    return next()
  } catch (e) {
    return res.status(400).json({ message: 'Not authenticated' })
  }
}
