const timeseriesModel = require( "../models/Timeseries" )


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
	console.log( "somthing", req.body )
	res.send(req.body)
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

	var totalCars = 0
	for (var i = 0; i < resultss.length; i++) {
		totalCars = totalCars + resultss[i].count
	}
	console.log("total cars", totalCars)
	res.json({
		timeseries: resultss,
		totalCars,
	})
}

exports.fakeTimeSeriesData = async (req, res) => {
	var date = new Date()
	dates = []
	for (var i = 0; i < 336; i += 1) {
		dates.push(new Date(date.valueOf() + i * 1000 * 60 * 60 * 1))
	}
	const dummyVehicles = []
	for (var i = 0; i < 336; i++) {
		for (var j = 0; j < 40; j++) {
			dummyVehicles.push(Math.floor(Math.random(1, 40) * j))
		}
	}
	// const datagot = {}
	const datagot = []

	// for (var i = 0; i < dates.length; i++) {
	// 	datagot[dates[i].getTime()] = dummyVehicles[i]
	// }
	for (var i = 0; i < dates.length; i++) {
		datagot.push({
			timestamp: dates[i].getTime(),
			value: dummyVehicles[i],
		})
	}
	console.log(datagot)

	var totalCars = 0
	for (var i = 0; i < datagot.length; i++) {
		totalCars = totalCars + datagot[i].count
	}
	console.log("total cars", totalCars)
	res.json({
		timeseries: datagot,
		totalCars,
	})
}
