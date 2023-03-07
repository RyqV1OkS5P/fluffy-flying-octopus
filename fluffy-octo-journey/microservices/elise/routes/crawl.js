import express from 'express'
import { basicAuthMiddleware } from "../middleware/auth.js"

var router = express.Router()

router.get('/crawl/v1/control', (req, res) => {
    getRandomKey(req, res)
})

router.get('/crawl/v1/status', (req, res) => {
    getRandomKey(req, res)
})

router.get('/crawl/v1/internal/state', (req, res) => {
    getRandomKey(req, res)
})

router.get('/crawl/v1/internal/add-state-to-queue',basicAuthMiddleware, (req, res) => {
    getRandomKey(req, res)
})

router.get('/crawl/v1/internal/queue-game-object',basicAuthMiddleware, (req, res) => {
    getRandomKey(req, res)
})

export { router }
