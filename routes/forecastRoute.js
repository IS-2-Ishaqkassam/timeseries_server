const express = require("express")

const router = express.Router()

router.get("/:id", require("../controllers/forecastController").getForecast)
router.post("/", require("../controllers/forecastController").postForecast)


module.exports = router
