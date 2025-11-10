import dotenv from 'dotenv'

dotenv.config()

import express from 'express'; // Import the Express module
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv();

// await redis.set('foo', 'bar');
// const data = await redis.get('foo');

const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 3000; // Define the port, using environment variable if available

// Define a route for the root URL (/)
app.get('/', (req, res) => {
    res.send('con song');
});

app.get('/getdata', (req, res) => {
    redis.set('data', req.query.data);
    res.send(req.query.data);
});

app.get('/data', (req, res) => {
    redis.get('data')
    .then(r => res.send(r));
});

app.get('/status', (req, res) => {
    redis.get('data')
    .then(d => {
      let output = [0, 0]
      let r = d.split(",");
      redis.get('database')
      .then(r => {
        let threshold = []
        r.split(",").forEach(a => threshold.push(parseInt(a)))
        return threshold
    })
      .then(threshold => {
        if (r[0] > threshold[0] || r[1] < threshold[1] || r[2] > threshold[2]) output[0] = 1
        if (r[3] > threshold[3] || r[4] < threshold[4] || r[5] > threshold[5]) output[1] = 1
        res.send(output.toString())
      })
    });
});

app.get('/database', (req, res) => {
    redis.get('database')
    .then(r => res.send(r));
});

app.get('/getDatabase', (req, res) => {
    redis.set('database', req.query.data);
    res.send(req.query.data);
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});