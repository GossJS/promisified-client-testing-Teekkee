import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import users_router from './_routes/routes';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};

let App = express();

App
	/*
	 * Bunch of middlewares here
	**/
	.use(bodyParser.json())
	.use(express.static("./static"))
	.use((res, req, next)=>{
		let get_time = new Date(Date.now())
		console.log(`${get_time}`)
		next();
	})

	/*
	 * Root routing
	**/
	.get("/", (req, res) => {
		res.sendFile("index.html")
		console.log(`Action: Root`)
	})

	/*
	 * Post query
	**/
	.post("/minus", (req, res) =>{
		res.setHeader('Content-Type', 'application/json')
		let a = req.body.first
		let b = req.body.second
		let result = Number(a) - Number(b)
		console.log(`Action: Arithmetic Operation - Subtraction ${result}`)
			res.json(result)
	})

	.get("/author", (req, res) => {
		res.set(CORS).send(`<h4 id="author" title="GossJS">Яковлев Игорь</h4>`)
	})

	/*
	 * Get query
	**/
	.get("/add/:a/:b", (req, res) => {
		let a = req.params.a
		let b = req.params.b
		let result = Number(a) + Number(b)
		console.log(`Action:\n\t\tArithmetic Operation - Addition ${result}`)
			res.json(result)
	})

	/*
	 * Callback functions
	**/
	.use("/users", users_router(express))
	.use((req, res)=>res.status(403).end(`Forbidden`))
	.use((req, res)=>res.status(404).end(`Not found`))
	.use((req, res)=>res.status(405).end(`Method Not Allowed`))
  	.use((err,req,res,next)=>res.status(500).end(`Internal Server Error`))
  	.use((err,req,res,next)=>res.status(502).end(`Bad Gateway`))
  	.use((err,req,res,next)=>res.status(500).end(`Gateway Timeout`))
;

http
	.createServer(App)
	.listen(process.env.PORT || 3000, () => console.log(`${process.env.PORT} - Server is up`))
;