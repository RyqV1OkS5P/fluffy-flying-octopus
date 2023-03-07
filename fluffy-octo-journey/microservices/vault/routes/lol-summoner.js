import express from "express"
import { getSummonerByName, getSummonerByPUUID, addSummonerNameToDb, addSummonerPUUIDToDb, subscribeToWebsocketEvents} from '../controller/vault.js'
var router = express.Router()


router.get('/lol-summoner/summoner-puuid-by-name/:name', (req, res) => {
        getSummonerByName(req, res)
})

router.get('/lol-summoner/summoner-name-by-encrypted-puuid/:puuid', (req, res) => {
        getSummonerByPUUID(req, res)
})

router.post('/lol-summoner/summoner', (req, res) => {
        addSummonerToDb(req, res)
})

router.post('/service/subscribe', (req, res) => {
        subscribeToWebsocketEvents(req, res)
})

export { router }
