const residentsModel = require("../models/Residents")

exports.getOneVehicle = async (req, res) => {
	const { id } = req.params
	console.log(req.params)
	try {
		await residentsModel.findOne({ id }, (err, vehicle) => {
			if (err) {
				console.log("error getting one vehicle")
				return res.status(404).json({
					message: "error getting one vehicle",
				})
			} else {
				console.log("Searched vehicle retrieved successfully")
				res.status(200).json(vehicle)
			}
		})
	} catch (err) {}
}

exports.editVehicle = async (req, res) => {
	const { id } = req.params
	const { resident_name, resident_email, resident_house_number } = req.body
	console.log(req.params)
	console.log(req.body)
	try {
		await residentsModel.findOneAndUpdate(
			{ "vehicles._id": id },

			{
				$set: { "vehicles.$": req.body },
			}
		)

		console.log("vehicle updated successfully")
		res.status(200).json({ message: "successful" })
	} catch (err) {
		res.status(400).json({
			message: "error",
			error: err.message,
		})
	}
}
