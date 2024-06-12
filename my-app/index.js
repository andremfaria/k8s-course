const Koa = require("koa");
const redis = require("redis");
const app = new Koa();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);

const client = redis.createClient({
  url: `redis://${redisHost}:${redisPort}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
// Connect once at startup
client.connect().then(() => {
  console.log("Connected to Redis");
}).catch(err => {
  console.error("Error connecting to Redis", err);
});
const getAndIncrement = async () => {
  console.log("getAndIncrement");
  try {
    return  client.incr("new_count");;
  } catch (err) {
    console.error("error", err);
    throw err;
  } 
};
app.use(async (ctx) => {
  const counter = await getAndIncrement();
  ctx.body = `Hello World! Counter is ${counter}`;
});

app.listen(3000);
