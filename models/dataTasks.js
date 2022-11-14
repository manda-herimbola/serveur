const mongoose = require('mongoose')

const dataBase = new mongoose.Schema({
    nb: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('task', dataBase)