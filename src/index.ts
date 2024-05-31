import express from "express";

const app = express();

let counter = 0;

app.get("/user", (req, res) => {
    counter++;
    res.json({
        "name": "senthil"
    })
})

app.get("/metrics", (req, res) => {
    res.send(`counter is ${counter}`)
})

app.listen(3000);