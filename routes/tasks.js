const express = require('express')
const {Request} = require('express')
const dataBase = require("../models/dataTasks");
const tasks = express.Router()

/**
 *
 * @param {Request} req
 * @param res
 * @param next
 */

tasks.get('/', async (req,res) => {
    try {
        const data = await dataBase.find()
        res.json(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

tasks.post('/', async (req, res) => {
    const { nb, id, work, username, email, title, description } = req.body
    const newDataBase = new dataBase({ nb, id, work, username, email, title, description })

    try {
        const newData = await newDataBase.save()
        res.status(201).json( { message: 'data created', newDataBase } )
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = tasks