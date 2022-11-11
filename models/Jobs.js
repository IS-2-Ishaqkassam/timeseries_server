const mongoose = require("mongoose")

const JobsSchema = new mongoose.Schema({
	jobId: String,
	date: {
		type: String,
		default: Date.now(),
	},
})

var Job = mongoose.model("Job", JobsSchema)
module.exports = Job
