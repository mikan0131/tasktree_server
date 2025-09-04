const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

const API_KEY = process.env.API_KEY || "my-secret-key"

server.use(middlewares)

server.use((req, res, next) => {
    const key = req.headers["x-api-key"]
    if(key === API_KEY) {
        next()
    } else {
        res.status(401).json({ error: "Invalid API Key"})
    }
})

server.use(router)

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`JSON Server with APIKey running at https://localhost:${port}`)
})