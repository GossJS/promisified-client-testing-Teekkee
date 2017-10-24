import { User } from '../mongo/conn';

export default inn =>{
	const route = inn.Router();
	//Create
	route
		/*
		 * Add user by proceding to `domain/users/add`
		 * curl - d `{"login","password"}` -H 'Content-Type: application/json' -X POST http://localhost:3000/users/add
		**/
		.route("/:login/:password")
		.get(async (req, res) => {
			let log = req.params.login
			let pass = req.params.password
			let user = {"login": log, "password": pass}
			let data = await User.findOne(user)
				console.log(`Action: Add user - ${log}`)
			if(data){
				res.send(`User already exists`)
			}else{
				let add = new User(user)
				await add.save()
				res.send(`New user ${log} been added successfully`)
			}
		})
	;
	//Read
	route
		.route("/")
		.get(async(req, res) => {
			let data = await User.find().exec();
				console.log(`Action: Get all users`);
			if(data) {
				res.send(`<ol>${data.map(exem => `<li>${exem.login} - ${exem.password}</li>`).join('')}</ol>`)
			}else{
				res.send(`Error has happened`)
			}
		})
	;
	//Update
	route
		.route("/:user/:password/:new_user/:new_password")
		.put(async (req, res) => {
			let log = req.params.user
			let pass = req.params.password
			let upd_n = req.params.new_user
			let upd_p = req.params.new_password
			let upd_us = {"login": upd_n, "password": upd_p}
			let user = {"login": log, "password": pass}
				console.log(`Action: Update users password - ${log}`)
			await User.findOneAndUpdate(user, upd_us, (err, doc) => {
				if(err) throw err 
				else res.send(`Users ${log} password has been updated`)
			})
		})
	;
	//Delete
	route
		/*
		 * Remove user by proceding to `domain/user/password`
		 * curl - d `{"login", "password"}` -H 'Content-Type: application/json' -X DELETE http://localhost:3000/users/:user/:password
		**/
		.route("/del/:user/:password")
		.delete(async (req, res) => {
			let log = req.params.user
			let pass = req.params.password
			let user = {"login": log, "password": pass}
				console.log(`Action: Delete user - ${log}`)
			await User.findOneAndRemove(user, (err, body) => {
				if (err) throw err
				else res.send(`User ${log} has been deleted`)
			})
		})
	;
	return route;
}