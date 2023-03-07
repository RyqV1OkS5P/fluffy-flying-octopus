import { KeyObject } from "../models/key.js"
import { loadKeys } from "../utils/key-loader.js"


const keysList = [];
const keysArray = await loadKeys("keys.json");

console.log("[INFO] Keys loaded")

  keysArray.forEach(Key => {
  const { id, key, account, seconds, minutes, active, current} = Key;
  const keyObject = new KeyObject(id, key, account, seconds, minutes, active, current);
  keysList.push(keyObject);
});

export { keysArray }

