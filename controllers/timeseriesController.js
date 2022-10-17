const timeseriesModel = require("../models/Timeseries")

exports.read = async (req, res) => {
	timeseriesModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		}

		res.send(result)
	})
}
