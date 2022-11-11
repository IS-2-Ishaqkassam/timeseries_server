const express = require("express")

const router = express.Router()

router.post("/", require("../controllers/jobsController").createJob)

module.exports = router
