import express from "express";
import client from "prom-client";
import { requestMiddleware } from "./metrics/metrics";
const app = express();

app.use(requestMiddleware);

app.get("/user", (req, res) => {
    
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