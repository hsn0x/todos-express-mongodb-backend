import express from "express"
import passport from "passport"

import routes from "./routes/index.js"
import { middlewares } from "./middleware/index.js"

import { deploymentConfig, expressConfig } from "./config/index.js"

import { dbSeed, dbSeedFake } from "./seeders/index.js"
import mongodb from "./db/mongodb.js"

const app = express()

app.use(middlewares)

app.use("/api/v1", routes)

const serverHost = expressConfig.host
let serverPort = ""

console.log(deploymentConfig.service)
if (deploymentConfig.service == "heroku") {
    serverPort = process.env.PORT || 80
} else {
    serverPort = expressConfig.port
}

const server = async () => {
    app.listen(serverPort, () => {
        console.log(
            `Express.js API Server with MongoDB is runnig ..., on port http://${serverHost}:${serverPort}`
        )
    })
}

const database = async () => {
    await mongodb()
    await dbSeed()
    await dbSeedFake()
}

server()
database()
