require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')

const PORT = process.env.PORT || 80



connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(express.static('public'));
app.use('/user', require('./routes/userRoute'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  
  mongoose.connection.on('error', err => {
    console.log(err)
})