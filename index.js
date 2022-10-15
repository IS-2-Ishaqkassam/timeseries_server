const express = require("express")
const ARIMA = require("arima")

// Synthesize timeseries
const ts = Array(24)
	.fill(0)
	.map((_, i) => i + Math.random() / 5)
const app = express()

const arima = new ARIMA({
	p: 2,
	d: 1,
	q: 2,
	verbose: false,
}).train(ts)

const [pred, errors] = arima.predict(12)

console.log(ts)
console.log(pred)
app.get("/", (req, res) => {
	res.send("welcome", req.body)
})

app.listen(4000, () => {
	console.log("app listening ... on 4000")
})
