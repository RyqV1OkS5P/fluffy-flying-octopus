import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


await client.connect();
console.log('Connected successfully to server');
const db = client.db('league-matches');
const collection = db.collection('documents');

