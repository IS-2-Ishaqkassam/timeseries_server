const mongoose = require("mongoose")

const ResidentSchema = new mongoose.Schema({
	resident_name: String,
	resident_email: String,
	house_number: String,
	vehicle_details: [
		{
			vehicle_model: String,
			vehicle_make: String,
			vehicle_color: String,
			number_plate: String,
		},
	],
})

var Residents = mongoose.model("Residents", ResidentSchema)
module.exports = Residents
