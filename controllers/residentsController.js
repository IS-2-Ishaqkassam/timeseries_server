const residentsModel = require("../models/Residents")

exports.createResident = async (req, res) => {
	const { resident_name, resident_email, resident_house_number, vehicles } =
		req.body

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
