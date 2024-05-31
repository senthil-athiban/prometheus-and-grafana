import express from "express";
import client from "prom-client";
import { requestCounterMiddleware } from "./metrics/metrics-counter";
import { requestGaugeMiddleWare } from "./metrics/metrics-gauge";
const app = express();

app.use(requestGaugeMiddleWare);

app.get("/user", async (req, res) => {
    await new Promise(res => setTimeout(res, 10000))
    res.status(200).json({
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