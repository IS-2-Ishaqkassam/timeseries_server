const express = require("express")
const router = express.Router()

const timeseriesController = require("../controllers/timeseriesController")

router.get("/read", timeseriesController.read)
router.get("/predict", timeseriesController.predict)
router.get("/group", timeseriesController.group)
router.get("/realTimeSeriesData", timeseriesController.realTimeSeriesData)
router.get("/fakeTimeSeriesData", timeseriesController.fakeTimeSeriesData)

module.exports = router
