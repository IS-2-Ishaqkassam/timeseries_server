const ARIMA = require("arima")

// Synthesize timeseries
const ts = Array(54)
	.fill(0)
	.map((_, i) => i + Math.random()*3)
// const app = express()

const arima = new ARIMA({
	p: 2,
	d: 1,
	q: 2,
	verbose: false,
}).train(ts)

const [pred, errors] = arima.predict(12)

console.log(ts)
console.log(pred)
