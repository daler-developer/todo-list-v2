import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

import tasksRouter from './routes/tasks.js'
import usersRouter from './routes/users.js'

const __dirname = path.resolve()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})


const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://dalersaidov:2000909k@cluster-for-learning.uecly.mongodb.net/todo-list-mern?retryWrites=true&w=majority')
  
    app.listen(process.env.PORT || 4000)
  } catch (e) {
    console.log('error')
  }
}

start()
