const mongoose = require("mongoose")

const tempSchema = new mongoose.Schema(
	{
		timestamp: {
			type: Number,
		},
		value: Number,
	},
	{ strict: false }
)

var Temp = mongoose.model("Temp", tempSchema)
module.exports = Temp
