const redis =  require('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'redis-18443.c8.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18443,
    }
});


module.exports = redisClient

