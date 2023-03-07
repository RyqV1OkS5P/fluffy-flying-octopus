import { LeakyBucket } from '../utils/bucket.js'
import { getSummonerById, getMatchByMatchId, getLeagueEntries, getMatchesByPuuid} from '../utils/riot-api-wrapper.js'
import { wss } from '../loaders/websocket.js'
//import { sendSumoner } from '../utils/summoner-service-wrapper.js'


// We should get this via transmitter

const API_KEY = "RGAPI-a5bb8af6-99a2-42c2-ba4b-9396587f15db"


let puuid = "G-c-pC-AJ2YVnn0t-4HPmJWEKZeazX3pGezN6rvh9LOf2ZN23LaJiG7zm69aUaRFhL3g4-X7sYnX4g"
let matches = []
let games = []
let summoners = []
let gamesThisWave = 0
let queue = []
const bucket = LeakyBucket(200);

 const States = {
    START : "START",
    GET_MATCHES : "GET_MATCHES",
    GET_MATCH_BY_ID : "GET_MATCH_BY_ID",
    PARSE_DATA : "PARSE_DATA",
    COMMIT_TO_DB : "COMMIT_TO_DB",
    STAND : "STAND"
}

let state = States.START
let input = States.SUCCESS
const transition = async (state, input) => {
    switch (state) {
        case States.START:
            switch (input) {
                case States.START:
                    return States.GET_MATCHES;
            }
        case States.GET_MATCHES:
            switch (input) {
                case States.SUCCESS:
                        console.log("[ INFO ] Getting matches")
                        if (bucket.consume(1)) {
                            matches = await getMatchesByPuuid('europe',puuid, '0','20',API_KEY)
                            console.log(matches)
                            return States.GET_MATCH_BY_ID
                        } else {
                            console.log('[ Warn ] Rate limit exceeded');
                            setTimeout(() => {}, 100000);              
                            }
                case States.FAILURE:
                    return States.END;
            }
        case States.GET_MATCH_BY_ID:
            switch (input) {
                case States.SUCCESS:
                    console.log("[ INFO ] Getting match information")
                    for (match in matches) {
                          if (bucket.consume(1)) {
                            let game = await getMatchByMatchId('europe',matches[match], API_KEY)
                            gamesThisWave++;
                            games.push(game)
                            console.log(game)
                            setTimeout(() => {}, 1000); 
                        } else {
                            console.log('[ Warn ] Rate limit exceeded');
                            setTimeout(() => {}, 100000);              
                            }
                       }
                    return States.PARSE_DATA;
                case States.FAILURE:
                    return States.END;
            }
        case States.PARSE_DATA:
            switch (input) {
                case States.SUCCESS:
                  if(gamesThisWave <= 400) {
                    puuid =  summoners[Math.floor(Math.random() * sumoners.length)] 
                    return States.START
                  }
                  console.log("[ INFO ] Adding participants")
                  for (game in games) {
                    for (participant in games[game].info.participants) {
                          wss.send(game.info.participants[participant])
                          summoners.push(game.info.participants[participant])
                      }
                  }
                      db.collection('matches').insertMany(games, (err, result) => {
                        if (err) {
                            } else {
                              }
                            });
                  puuid =  summoners[Math.floor(Math.random() * sumoners.length)]
                  global.gc();
                  return States.START;
                case States.FAILURE:
                    return States.END;
            }
        case States.END:
            return States.END;
    }
};


const run = () => {
    while (state !== States.END) {
        state = transition(state, input);
    }
};

run()

