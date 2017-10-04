import path from 'path';
import jsonfile from 'jsonfile-promised';
//UPD:????
import fs from 'fs';
//import users from '../_data/users.mjs';
const users = path.resolve('./_data/users.json');

export default inn =>{
	const route = inn.Router();

	route
		.route("/")
		.get(async (req, res) =>{
			//UPD:???
			let data = await jsonfile.readFile(users)
			console.log(`Action: Get all users`)
			let lsit = `<ul style="list-style-type:none">${data.users.map(exem => `<li>${exem.login}</li>`).join('')}</ul>`
			res.send(lsit)
		})
	;
	route
		/*
		 * Add user by proceding to `domain/users/add`
		 * curl - d `{"login","password"}` -H 'Content-Type: application/json' -X POST http://localhost:3000/users/add
		**/
		.route("/add")
		.post(async (req, res) =>{
			let data = await jsonfile.readFile(users)
			let log = req.body.login
			let pass = req.body.password
			console.log(`Action: Add user - ${log}`)
			let compose = {"login":log, "password": pass}
			if(log != undefined && pass != undefined){
				data.users.push(compose)
					/*jsonfile rewrites json with backslashes
								???
					*/
					fs.writeFile('./_data/users.json', JSON.stringify(data), (err) => {
						if (err) throw err
					});
				res.send(`New user been added successfully`)
			}else{
				res.send(`Cannot add new user`)
			}
		})
	;
	route
		/*
		 * Remove user by proceding to `domain/user/password`
		 * curl - d `{"login", "password"}` -H 'Content-Type: application/json' -X DELETE http://localhost:3000/users/:user/:password
		**/
		.route("/:user/:password")
		.delete(async (req,res) => {
			let data = await jsonfile.readFile(users)
			let clea = req.params.user
			let check = req.params.user
			console.log(`Action: Delete user - ${clea}`)
				if (clea != undefined && check !=undefined){
					let change = data.users.filter( finders=> finders.login != clea && finders.password !=check)
					data.users = change
					fs.writeFile('./_data/users.json', JSON.stringify(data), (err) => {
						if (err) throw err
					})
					res.send(`User has been removed!`)
				}else {
					res.send(`Cannot remove user`)
				}
		})
	return route;
}