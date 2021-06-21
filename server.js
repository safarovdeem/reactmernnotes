const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

// connection to DB
connectDB()

// import routes
const transactions = require('./routes/transactions')

const app = express()

// body parse
app.use(express.json())

// using morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/transactions', transactions)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.get('/', (req, res) => res.send('Hello'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} node on port: ${PORT}`.yellow.bold))