import express from "express"
import passport from "passport"

import routes from "./routes/index.js"
import { middlewares } from "./middleware/index.js"

import { expressConfig } from "./config/index.js"

import { dbSeed, dbSeedFake } from "./seeders/index.js"
import mongodb from "./db/mongodb.js"

const app = express()

app.use(middlewares)

app.use("/api/v1", routes)

const serverHost = expressConfig.host
const serverPort = process.env.PORT || 80

const server = async () => {
    await mongodb()
    // await dbSeed()
    // await dbSeedFake()

    app.listen(serverPort, () => {
        console.log(
            `Express.js API Server with MongoDB is runnig ..., on port http://${serverHost}:${serverPort}`
        )
    })
}

server()
