import { keysArray } from "../loaders/key-loader.js"


async function getRandomKey(req, res, next) {
    try {
        let key = Math.floor(Math.random() * keysArray.length)
        console.log(keysArray[key])    
        keysArray[key].active++
        keysArray[key].current = keysArray[key].minutes / keysArray[key].active;
        return res.status(201).json(keysArray[key]);
    } catch (err) {
        console.log(err)
        //return next(err);
    }
}

async function getKeyPropertyComplete(req, res, next) {
    const keyID = req.params.keyID;
    try {
   const key = keysArray.find((key) => key.id === keyID);
  if (!key) {
    return res.status(400).json({ message: "Key not found" });
  }
  res.status(200).json({ key });
    } catch (err) {
        //return next(err);
    }
}

async function getKeyProperty(req, res, next) {
    const keyID = req.params.keyID;
    const keyProperty = req.params.property;

    try {
   const key = keysArray.find((key) => key.id === keyID);
  if (!key) {
    return res.status(400).json({ message: "Key not found" });
  }
  const property = key[keyProperty];
  res.status(200).json({ property });
    } catch (err) {
        console.log(err)
    }
}


export { getRandomKey, getKeyProperty, getKeyPropertyComplete }
