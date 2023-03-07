// LeakyBucket implementation per https://en.wikipedia.org/wiki/Leaky_bucket.

const LeakyBucket = (limit) => {
  let lastTime = Date.now();
  let bucket = 0;

  const checkLimit = () => {
    const currentTime = Date.now();
    const timeDifference = (currentTime - lastTime) / 1000; // time difference in seconds
    lastTime = currentTime;

    bucket = Math.max(bucket - timeDifference * (limit / 60), 0);
  };

  return {
    consume: (tokens = 1) => {
      checkLimit();

      if (bucket + tokens > limit) {
        return false;
      }

      bucket += tokens;
      return true;
    },
    getTokensRemaining: () => limit - bucket
  };
};



//  const bucket = LeakyBucket(200);

  //setInterval(() => {
    //if (bucket.consume(1)) {
     // console.log('You consumed 1 token!');
   // } else {
     // console.log('You can not consume more tokens! You have ' + bucket.getTokensRemaining() + ' tokens remaining.');
    //}
  //}, 1000);

export { LeakyBucket }

