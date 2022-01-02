import validator from 'express-validator'


const validation = (req, res, next) => {
  const errors = validator.validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid values', errors: errors.errors })
  }

  return next()
}

export default validation
