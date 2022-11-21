const timeseriesModel = require("../models/Timeseries")
const tempModel = require("../models/Temp")

exports.read = async (req, res) => {
	timeseriesModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		}

		res.send(result)
	})
}

exports.predict = async (req, res) => {
	const agg = [
		{
			$project: {
				date: {
					$dateToParts: {
						date: "$timestamp",
					},
				},
				number_plate: 1,
			},
		},
	]

	const cursor = timeseriesModel.aggregate(agg)
	var results = await cursor
	timeseriesModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		}
		console.log(results)
		res.send(results)
	})
}

exports.group = async (req, res) => {
	const agg = [
		{
			$group: {
				_id: {
					day: {
						$dateToParts: {
							date: "$timestamp",
						},
					},
					hour: "$date",
					timestamp: "$timestamp",
				},
				count: { $sum: 1 },
			},
		},
		{
			$group: {
				_id: "$_id.timestamp",
				carCounts: {
					$push: {
						hour: "$_id.hour",
						count: "$count",
					},
				},
			},
		},
		{
			$project: {
				_id: 1,
				carCounts: 1,
				totalCars: {
					sum: "$carCounts.count",
				},
			},
		},
	]

	const cursor = timeseriesModel.aggregate(agg)
	var results = await cursor
	timeseriesModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		}
		console.log(results)
		res.send(results)
	})
}

exports.postman = async (req, res) => {
	const data = new tempModel({
		timestamp: 2354234525,
		value: 32,
	})

	try {
		await data.save()
		await tempModel.create({
			timestamp: 5454234525,
			value: 12,
		})
		return res.status(200).json({
			message: "success",
		})
	} catch (err) {
		return res.status(400).json(err)
	}
}
exports.realTimeSeriesData = async (req, res) => {
	//this is in use, gives hourly count of vehicles
	const aggg = [
		{
			$group: {
				_id: {
					hour: { $hour: "$timestamp" },
					day: { $dayOfMonth: "$timestamp" },
					month: { $month: "$timestamp" },
					year: { $year: "$timestamp" },
				},
				count: { $sum: 1 },
				date: { $first: "$timestamp" },
			},
		},
		{
			$project: {
				date: "$date", //day-month-year-hour-dayofweek(startingfromsunday)-
				// hour: "$_id.hour",
				// date: {
				// 	// hour: "$_id.hour",
				// 	$dateToString: { format: "%Y-%d-%m-%H-%w", date: "$date" },//day-month-year-hour-dayofweek(startingfromsunday)-
				// },
				count: 1,
				_id: 0,
			},
		},
		{
			$sort: {
				date: 1,
			},
		},
	]

	const cursorr = timeseriesModel.aggregate(aggg)
	var resultss = await cursorr
	// date.format("%w-%d-%m-%Y-%H")//dayofweek(startingfromsunday)-day-month-year-hour
	console.log("real results", resultss)
	const detailedBreakDown = []
	for (var i = 0; i < resultss.length; i++) {
		detailedBreakDown.push({
			dayOfWeek: new Date(resultss[i].date).getDay(),
			data: {
				hourOfDay: new Date(resultss[i].date).getHours(),
				count: resultss[i].count,
				month: new Date(resultss[i].date).getMonth() + 1,
				date: new Date(resultss[i].date).getDate(),
				year: new Date(resultss[i].date).getFullYear(),
			},
		})
	}
	console.log("ishaq", detailedBreakDown)

	const response = []
	for (var i = 0; i < detailedBreakDown.length; i++) {
		response.push({
			dayOfWeek: detailedBreakDown[i].dayOfWeek,
			data: {
				hourOfDay: detailedBreakDown[i].data.hourOfDay + ":00",
				count: detailedBreakDown[i].data.count,
				month: detailedBreakDown[i].data.month,
				date_month:
					"Date: " +
					detailedBreakDown[i].data.date +
					"/" +
					detailedBreakDown[i].data.month,
				date: detailedBreakDown[i].data.date,
				year: detailedBreakDown[i].data.year,
			},
		})
	}

	console.log("response", response)

	var totalCars = 0
	for (var i = 0; i < resultss.length; i++) {
		totalCars = totalCars + resultss[i].count
	}
	console.log("total cars", totalCars)
	res.json({
		timeseries: response,
		totalCars,
	})
}

exports.fakeTimeSeriesData = async (req, res) => {
	var date = new Date()
	var dates = []
	for (var i = 0; i < 672; i += 1) {
		dates.push(new Date(date.valueOf() + i * 1000 * 60 * 60 * 1))
	}
	const dummyVehicles = []
	for (var i = 0; i < 672; i++) {
		for (var j = 0; j < 40; j++) {
			dummyVehicles.push(Math.floor(Math.random(1, 40) * j))
		}
	}
	const datagot = []

	for (var i = 0; i < dates.length; i++) {
		datagot.push({
			timestamp: dates[i].getTime(),
			value: dummyVehicles[i],
		})
	}

	const detailedBreakDown = []
	for (var i = 0; i < datagot.length; i++) {
		detailedBreakDown.push({
			dayOfWeek: new Date(datagot[i].timestamp).getDay(),
			data: {
				hourOfDay: new Date(datagot[i].timestamp).getHours(),
				count: datagot[i].value,
				month: new Date(datagot[i].timestamp).getMonth() + 1,
				date: new Date(datagot[i].timestamp).getDate(),
				year: new Date(datagot[i].timestamp).getFullYear(),
			},
		})
	}
	console.log("Detailed Breakdown", detailedBreakDown)

	const response = []
	for (var i = 0; i < detailedBreakDown.length; i++) {
		response.push({
			dayOfWeek: detailedBreakDown[i].dayOfWeek,
			data: {
				hourOfDay: detailedBreakDown[i].data.hourOfDay + ":00",
				count: detailedBreakDown[i].data.count,
				month: detailedBreakDown[i].data.month,
				date_month:
					"Date: " +
					detailedBreakDown[i].data.date +
					"/" +
					detailedBreakDown[i].data.month,
				date: detailedBreakDown[i].data.date,
				year: detailedBreakDown[i].data.year,
			},
		})
	}
	console.log("response", response)

	var totalCars = 0
	for (var i = 0; i < datagot.length; i++) {
		totalCars = totalCars + datagot[i].value
	}
	res.json({
		timeseries: response,
		totalCars,
	})
}
exports.datefakeTimeSeriesData = async (req, res) => {
	var date = new Date()
	var dates = []
	for (var i = 0; i < 400; i += 1) {
		dates.push(
			new Date(date.valueOf() + i * 1000 * 60 * 60 * 1).toLocaleString()
		)
	}
	const dummyVehicles = []
	for (var i = 0; i < 4000; i++) {
		for (var j = 0; j < 40; j++) {
			dummyVehicles.push(Math.floor(Math.random(1, 40) * j))
		}
	}
	const datagot = []

	for (var i = 0; i < dates.length; i++) {
		datagot.push({
			timestamp: dates[i],
			vehicle_count: dummyVehicles[i],
		})
	}

	var totalCars = 0
	for (var i = 0; i < datagot.length; i++) {
		totalCars = totalCars + datagot[i].value
	}
	console.log("date fake datagot: ", datagot)
	res.json({
		timeseries: datagot,
		totalCars,
	})
}
