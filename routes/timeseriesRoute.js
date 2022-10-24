const express = require("express")
const router = express.Router()

const timeseriesController = require("../controllers/timeseriesController")

router.get("/read", timeseriesController.read)
router.get("/predict", timeseriesController.predict)

module.exports = router
