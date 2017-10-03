import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import usersRoute from './_routes/routes';

const PORT = 3000;
let App = express();

/*
 * Logging
 *   ???
**/

App
	/*
	 * Bunch of middlewares here
	**/
	.use(bodyParser.json())
	.use((res, req, next)=>{
		let get_time = new Date(Date.now());
		console.log(`Exact time is ${get_time}`);
		next();
	})
	/*
	 * Root routing
	**/
	.get("/", (req, res) => {
		// res.sendFile("public/index.html")
		console.log(`Action:\n\t\tIn`)
		res.send(`Well, lets in general use this kind of braces ${PORT}`)
	})

	/*
	 * Post query
	**/
	.post("/minus", (req, res) =>{
		res.setHeader('Content-Type', 'application/json')
		let a = req.body.first
		let b = req.body.second
		let result = Number(a) - Number(b)
		console.log(`Action:\n\t\tArithmetic Operation - Subtraction`)
			res.json(result)
	})

	/*
	 * Get query
	**/
	.get("/add/:a/:b", (req, res) => {
		let a = req.params.a
		let b = req.params.b
		let result = Number(a) + Number(b)
		console.log(`Action:\n\t\tArithmetic Operation - Addition`)
			res.json(result)
	})

	/*
	 * Callback functions
	**/
	.use("/users", usersRoute(express))
;

http
	.createServer(App)
	.listen(PORT, () => console.log(`Server is up\nPort - ${PORT}`))
;