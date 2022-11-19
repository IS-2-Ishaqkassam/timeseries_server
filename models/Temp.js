const mongoose = require("mongoose")

const tempSchema = new mongoose.Schema(
	{
		job_id: String,
		forecast: [
			{
				value: Number,
				timestamp: Number,
			},
		],
	},

	{ timestamps: true }
)

var Temp = mongoose.model("Temp", tempSchema)
module.exports = Temp
