const express = require('express')
const app = express();
const morgan = require('morgan')
const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(morgan('tiny'))

// routes
app.use('/api/v1/tasks', tasksRouter)

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
