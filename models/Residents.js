const mongoose = require("mongoose")

const ResidentSchema = new mongoose.Schema({
	resident_name: String,
	resident_email: String,
	resident_house_number: String,

	vehicles: [
		{
			vehicle_number_plate: String,
			vehicle_make: String,
			vehicle_model: String,
			vehicle_color: String,
		},
	],
})

var Residents = mongoose.model("Residents", ResidentSchema)
module.exports = Residents
