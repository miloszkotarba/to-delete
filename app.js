const express = require('express')
const app = express();
const morgan = require('morgan')
const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(morgan('tiny'))

// routes
app.use('/api/v1/tasks', tasksRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

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
