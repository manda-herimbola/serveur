const express = require('express')
const {Request} = require('express')
const dataBase = require("../models/dataUsers");
const users = express.Router()
const jwt = require('jsonwebtoken')
const {use} = require("express/lib/router");
const secretKey = 'secretKey';

/**
 *
 * @param {Request} req
 * @param res
 * @param next
 */

const routeGuard = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        req.token = bearer[1]
        next()
    }
}

const getAllUsers = async ( req, res ) => {
    jwt.verify( req.token , secretKey, (err, authData) => {
        if (err) res.status(403).json({ err })
        else {
            res.json({
                email: authData.usersFilter.email,
                username: authData.usersFilter.username,
                id: authData.usersFilter._id
            })
        }
    })
}

users.get( '/', routeGuard, getAllUsers)

users.post( '/login' , async ( req, res ) => {
    const { email, password } = req.body
    const usersFilter = await dataBase.findOne({ email, password })

    if (usersFilter) {
        jwt.sign({ usersFilter }, secretKey, (err, token) => {
            if (err) res.status(500).json(err)
            else res.json({ token })
        })
    }else res.status(403).json({err: "pass or username wrong"})
})

users.post( '/create', async ( req, res ) => {
    const { email, username, password } = req.body
    const newDataBase = new dataBase({ email, username, password })

    try {
        const newData = await newDataBase.save()
        res.status(201).json( { message: 'finished' } )
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = users;