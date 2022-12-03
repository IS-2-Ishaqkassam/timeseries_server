const express = require("express")
const router = express.Router()

const timeseriesController = require("../controllers/timeseriesController")

router.get("/read", timeseriesController.read)
router.post("/predict", timeseriesController.predict)
router.get("/group", timeseriesController.group)
router.get("/realData", timeseriesController.realTimeSeriesData)
router.get("/fakeData", timeseriesController.fakeTimeSeriesData)
router.get("/datefakeData", timeseriesController.datefakeTimeSeriesData)
router.post("/postman", timeseriesController.postman)

module.exports = router
