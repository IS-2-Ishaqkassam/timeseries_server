const tempModel = require("../models/Temp")

exports.getForecast = async (req, res) => {
	const { id } = req.params
	console.log("job id from params", id)

	// var data = []
	try {
		await tempModel.findOne({ job_id: id }, (err, result) => {
			console.log("forecast", result)
			return res.status(200).json(result)
		})
		// for (var i = 0; i < data.forecast.length; i++) {
		// 	data.push({
		// 		time: forecast.forecast[i].timestamp,
		// 		value: Math.floor(forecast.forecast[i].value),
		// 	})
		// }
	} catch (error) {
		console.log("error in getForecast", error)
	}
	// console.log("result: ", data)
}

exports.deleteManyErrors = async (req, res) => {
	tempModel
		.deleteMany({
			error: "An unexpected error occurred.",
		})
		.then((response) => {
			res.status(200).json({ message: "okay" })
		})
}
