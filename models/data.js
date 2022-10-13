const mongoose = require('mongoose')

const dataBase = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('users', dataBase)