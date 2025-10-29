const redis =  require('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});


module.exports = redisClient

