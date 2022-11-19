const express = require("express")

const router = express.Router()

router.get("/:id", require("../controllers/forecastController").getForecast)
// router.delete(
// 	"/delete",
// 	require("../controllers/forecastController").deleteManyErrors
// )

module.exports = router
