const express = require("express")
const router = express.Router()

const residentController = require("../controllers/residentsController.js")

router.post("/", residentController.createResident)
router.get("/", residentController.getAllResidents)
router.get("/:id", residentController.getOneResident)
router.put("/:id", residentController.editResident)

module.exports = router
