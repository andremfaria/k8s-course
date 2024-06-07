const Koa = require('koa');
const redis = require('redis');
const app = new Koa();


const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);

const client = redis.createClient({
  url: 'redis://redisHost:redisPort',
});

const getAndIncrement = async () => {

  return new Promise((resolve, reject) => {
    client.get('counter', (err, value) => {
      try {
      if (err) {
        reject(err);
      } else {
        const counter = parseInt(value) || 0;
        const newCounter = counter + 1;
        client.set('counter', newCounter, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newCounter);
          }
        });
      }
    }catch(err) {
      console.error(err);
      reject(err)
    }
    finally {
      redisClient.disconnect()

    }
    });
  });
}
app.use(async ctx => {
  const counter = await getAndIncrement()
  ctx.body = `Hello World! Counter is ${counter}`;
});

app.listen(3000);