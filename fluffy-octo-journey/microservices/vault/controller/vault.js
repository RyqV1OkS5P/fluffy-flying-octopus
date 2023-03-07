import { client } from "../loaders/redis.js"

function getSummonerByName(req, res) {
  client.get(req.body.name, (err, reply) => {
  if (err) {
    console.log(err);
  } else {
      req.status(200).send(reply)
    }
});
}

function getSummonerByPUUID(req, res) {
client.keys(req.body.puuid, (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    req.status(200).send(reply)
    console.log(`Key for value retrieved successfully: ${reply}`);
  }
});

}

function addSummonerNameToDb(req, res) {
  client.set(req.body.name, req.body.puuid, (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    req.status(200);
    console.log(`[Info ] Added summoner name to DB without a puuid`);
  }
});
}

function addSummonerPUUIDToDb(req, res) {
  client.set('undefined', req.body.puuid, (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    req.status(200)
    console.log(`[Info ] Added summoner puuid to DB with name undefined`); 
  }
});
}

function addSummonerToDb(req, res) {
  client.set(req.body.name, req.body.puuid, (err, reply) => {
  if (err) {
    console.log(err);
  } else {
    req.status(200)
    console.log(`[Info ] Added summoner puuid to DB`); 
  }
});
}

function subscribeToWebsocketEvents(req, res) {

}

export { getSummonerByName, getSummonerByPUUID, addSummonerNameToDb, addSummonerPUUIDToDb, addSummonerToDb, subscribeToWebsocketEvents}
