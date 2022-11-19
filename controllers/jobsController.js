const jobModel = require("../models/Jobs")

exports.createJob = async (req, res) => {
	const { id, date } = req.body.data
	console.log("create job", req.body.data)

	try {
		await jobModel.create({
			jobId: id,
			date: new Date(date).getTime(),
		})

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
