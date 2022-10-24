require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const cors = require("cors")

// const authenticate = require("./middleware/auth")

const app = express()

app.use( cors( {
	allowedHeaders: ['Content-Type', 'Authorization'],
	origin: ['http://localhost:3000'],
	credentials: true,
}))

app.use(express.json())

app.use("/", require("./routes/timeseriesRoute"))


module.exports = app