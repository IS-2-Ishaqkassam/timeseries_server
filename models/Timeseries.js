const mongoose = require("mongoose")

const timeseriesSchema = new mongoose.Schema({
	timestamp: {
		type: Date,
		default: Date.now,
	},
	number_plate: {
		type: String,
	},
})

var Timeseries = mongoose.model('Timeseries', timeseriesSchema)
module.exports = Timeseries
