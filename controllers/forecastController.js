const tempModel = require("../models/Temp")

exports.getForecast = async (req, res) => {
	const { id } = req.params
	console.log("job id from params", id)

	try {
		const data = await tempModel.findOne({ job_id: id })
		const formattedData = []
		console.log("data", data.forecast.length)
		for (var i = 0; i < data.forecast.length; i++) {
			formattedData.push({
				vehicle_count: Math.floor(data.forecast[i].value),
				time: new Date(data.forecast[i].timestamp).toLocaleString(),
			})
		}
		console.log("getForecast", formattedData)
		res.status(200).json(formattedData)
	} catch (error) {
		console.log("error in getForecast", error)
	}
}

exports.postForecast = async (req, res) => {
	console.log("create forecast", req.body.data)

	try {
		await jobModel.create(req.body.data)

		res.status(200).json({
			message: "success",
		})
	} catch (err) {
		res.status(404).json({
			message: "error",
			detail: err.message,
		})
	}
}
