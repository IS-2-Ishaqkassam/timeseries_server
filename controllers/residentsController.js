const residentsModel = require("../models/Residents")

exports.createResident = async (req, res) => {
	const { resident_name, resident_email, resident_house_number, vehicles } =
		req.body

	console.log(req.body)

	try {
		await residentsModel.create({
			resident_name,
			resident_email,
			resident_house_number,
			vehicles,
		})
		console.log("resident posted successfully")
	} catch (err) {
		console.log(err)
		res.status(400).json({
			message: err.message,
		})
	}
}

exports.getAllResidents = async (req, res) => {
	try {
		await residentsModel.find({}, (err, residents) => {
			if (err) {
				console.log("error getting all residents")
				return res.status(404).json({
					message: "error getting all residents",
				})
			} else {
				console.log("All residents retrieved successfully")
				res.status(200).json(residents)
			}
		})
	} catch (err) {}
}

exports.getOneResident = async (req, res) => {
	const { id } = req.params
	console.log(req.params)
	try {
		await residentsModel.findById(id, (err, resident) => {
			if (err) {
				console.log("error getting one residents")
				return res.status(404).json({
					message: "error getting all residents",
				})
			} else {
				console.log("Searched resident retrieved successfully")
				res.status(200).json(resident)
			}
		})
	} catch (err) {}
}

exports.editResident = async (req, res) => {
	const { id } = req.params
	const { resident_name, resident_email, resident_house_number } = req.body
	console.log(req.params)
	console.log(req.body)
	try {
		await residentsModel.findOneAndUpdate(id, {
			resident_name,
			resident_email,
			resident_house_number,
		})

		console.log("resident updated successfully")
		res.status(200).json({ message: "successful" })
	} catch (err) {
		res.status(400).json({
			message: "error",
			error: err.message,
		})
	}
}