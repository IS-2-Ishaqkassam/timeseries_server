require("dotenv").config()
require("./config/database").connect()
const express = require("express")
const cors = require("cors")

// const authenticate = require("./middleware/auth")

const app = express()

app.use(
	cors({
		allowedHeaders: ["Content-Type", "Authorization"],
		origin: ["http://localhost:3000"],
		credentials: true,
	})
)

app.use(express.json())

app.use("/timeseries", require("./routes/timeseriesRoute"))
app.use("/resident", require("./routes/residentsRoute"))
app.use("/jobs", require("./routes/jobsRoute"))
app.use("/vehicle", require("./routes/vehiclesRoute"))
app.use("/forecast", require("./routes/forecastRoute"))

module.exports = app
