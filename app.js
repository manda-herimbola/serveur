const express = require('express')
const app = express()
const mongoose = require('mongoose')
const users = require('./routes/users')
const tasks = require('./routes/tasks')
const bodyParser = require("body-parser")
const cors = require('./cors/cors')

mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to dataBase'))

app.use(cors)
app.use(bodyParser.json())
app.use(express.json())

app.use( '/users' , users )
app.use( '/tasks' , tasks )

app.listen( 5000 , () => console.log('server run'))