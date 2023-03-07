import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  await client.connect();
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
