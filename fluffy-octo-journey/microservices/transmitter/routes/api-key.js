import express from "express"
import { getRandomKey, getKeyProperty, getKeyPropertyComplete } from "../controllers/api-handler.js"

var router = express.Router()

// TODO: Routes should receive and ID, server should have a master table ID:Key

router.get('/api-key/random', (req, res) => {
    getRandomKey(req, res)
})

router.get('/api-key/:keyID/complete', (req, res) => {
    getKeyPropertyComplete(req, res)
})


router.get('/api-key/:keyID/:property', (req, res) => {
    getKeyProperty(req, res)
})


//router.put('/api-key/{key}/requests/{number-of-requests}', (req, res) => {
  //  res.send(increaseRequest(req.params.key, req.params.number-of-requests))
//})

export { router }

