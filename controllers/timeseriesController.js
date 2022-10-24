const timeseriesModel = require("../models/Timeseries")

exports.read = async (req, res) => {
	timeseriesModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		}

		res.send(result)
	})
}

exports.predict = async ( req, res ) => {
	
	const agg = [
		{
		  '$project': {
			 'date': {
				'$dateToParts': {
				  'date': '$timestamp'
				}
			 }, 
			 'number_plate': 1
		  }
		}
	 ];
	 
	 const cursor = timeseriesModel.aggregate(agg);
	 var results = await cursor;
	timeseriesModel.find({}, (err, result) => {
		if (err) {
			res.send(err)
		}
		res.send(results)
		
	})

}
