import express from "express";
import client from "prom-client";

const app = express();

const counter = new client.Counter({
    "name": 'http_requests_total',
    "help": 'Number of HTTP  requests Made'
})

app.get("/user", (req, res) => {
    counter.inc();
    res.json({
        "message": "hello world"
    })
})

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.send(metrics);
})

app.listen(3000, () => {
    console.log("server started")
});