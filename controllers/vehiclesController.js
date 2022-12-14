const residentsModel = require("../models/Residents")

exports.getOneVehicle = async (req, res) => {
	const { id } = req.params
	console.log(req.params)
	try {
		await residentsModel.findOne({ id }, (err, vehicle) => {
			if (err) {
				return res.status(404).json({
					message: "error getting one vehicle",
				})
			} else {
				res.status(200).json(vehicle)
			}
		})
	} catch (err) {}
}

exports.editVehicle = async (req, res) => {
	const { id } = req.params

	try {
		await residentsModel.findOneAndUpdate(
			{ "vehicles._id": id },

			{
				$set: { "vehicles.$": req.body },
			}
		)

		res.status(200).json({ message: "successful" })
	} catch (err) {
		res.status(400).json({
			message: "error",
			error: err.message,
		})
	}
}

exports.deleteVehicle = async (req, res) => {
	const { id } = req.params
	console.log("delete id", id)

	try {
		await residentsModel.updateOne(
			{ "vehicles._id": id },
			{
				$pull: { vehicles: { _id: id } },
			}
		)

		res.status(200).json({ message: "successful" })
		// res.status(200).json({ message: "successful" })
	} catch (err) {
		res.status(400).json({
			message: "error",
			error: err.message,
		})
	}
}
