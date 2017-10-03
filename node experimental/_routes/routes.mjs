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
			let data = await jsonfile.readFile(users);
			console.log(`Action:\n\t\tGet users`);
			let lsit = `<ul style="list-style-type:none">${data.users.map(exem => `<li>${exem.login}</li>`).join('')}</ul>`;
			res.send(lsit);
		})
	;
	route
		.route("/add")
		.post(async (req, res) =>{
			let data = await jsonfile.readFile(users);
			console.log(`Action:\n\t\tAdd user`);
			let log = req.body.login;
			let pass = req.body.password;
			let compose = {"login":log, "password": pass};
			if(log != undefined && pass != undefined){
				data.users.push(compose)
					/*jsonfile rewrites json with backslashes
								???
					*/
					fs.writeFile('./_data/users.json', JSON.stringify(data), (err) => {
						if (err) throw err;
					});
				res.send(`New user been added successfully`);
			}else{
				res.send(`Cannot add new user`);
			}
		})
	;
	route
		.route("/purge/:user")
		.delete(async (req,res) => {
			let data = await jsonfile.readFile(users);
			console.log(`Action:\n\t\tDelete user`);
			let clea = req.params.user;
			if( clea != undefined){
				let change = data.users.filter( finders=> finders.login != clea);
				data.users = change;
				fs.writeFile('./_data/users.json', JSON.stringify(data), (err) => {
					if (err) throw err;
				});
				res.send(`User has been removed!`);
			}else {
				res.send(`Cannot remove user`);
			}
		})
	return route;
}