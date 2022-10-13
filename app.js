const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/users')
const bodyParser = require("body-parser")

mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true })

const db = mongoose.connection;
const cors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, token")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    next()
}

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to dataBase'))

app.use(bodyParser.json())
app.use(cors)
app.use(express.json())

app.use( '/users' , routes )

app.listen(5000 , () => console.log('server run'))