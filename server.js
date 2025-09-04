const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const API_KEY = process.env.API_KEY || "my-secret-key";

const apiKeyAuth = (req, res, next) => {
    const key = req.headers["x-api-key"];
    if (key === API_KEY) {
        next();
    } else {
        res.status(401).json({ error: "Invalid API Key"});
    }
}

app.use(apiKeyAuth)

app.get("/posts", (res, res) => {
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    res.json(db.posts || []);
})