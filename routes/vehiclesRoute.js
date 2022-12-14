const express = require("express")
const router = express.Router()

const vehicleController = require("../controllers/vehiclesController.js")

router.get("/:id", vehicleController.getOneVehicle)
router.put("/:id", vehicleController.editVehicle)
router.delete("/:id", vehicleController.deleteVehicle)

module.exports = router
