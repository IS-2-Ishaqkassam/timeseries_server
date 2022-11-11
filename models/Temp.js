const mongoose = require("mongoose")

const tempSchema = new mongoose.Schema(
	[
		{
			timestamp: Number,
			value: Number,
		},
	],
	{ timestamps: true }
)

var Temp = mongoose.model("Temp", tempSchema)
module.exports = Temp
