import https from 'https'

const region = "euw1"
const key = "RGAPI-31d541c9-cd86-4e24-864e-7f2e0c4294f8"

const API_KEY = "RGAPI-a5bb8af6-99a2-42c2-ba4b-9396587f15db"

let puuid = "G-c-pC-AJ2YVnn0t-4HPmJWEKZeazX3pGezN6rvh9LOf2ZN23LaJiG7zm69aUaRFhL3g4-X7sYnX4g"

async function getLeagueEntries(region, tier, division, page, api_key) {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/${tier}/${division}/I?page=${page}&api_key=${api_key}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}


async function getSummonerById(region, summonerId, api_key) {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${api_key}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function getMatchesByPuuid(region, puuid, start, count, api_key) {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${api_key}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}


function getMatchByMatchId(region, matchId, api_key) {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`;
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
  let match = await getMatchesByPuuid('europe',puuid, '0','20',API_KEY)
  console.log(match)
}

main()
export { getSummonerById, getMatchByMatchId, getLeagueEntries, getMatchesByPuuid}

