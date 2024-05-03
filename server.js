import express from "express"
import morgan from "morgan"
import cors from "cors"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.get("/hey", (req, res) => {
	console.log(req.body)
	const jsonData = {
		heartbeat: "dope"
	}
	res.status(200).json(jsonData)
})
app.post("/hey", (req, res) => {
	console.log({ r: req.body })
	res.status(200).json(req.body)
})
app.listen(3000, () => {
	console.log("running on port 3000")
})
