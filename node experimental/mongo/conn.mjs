import Mongo from 'mongoose';

//Mongoose connector
const conn = Mongo.createConnection("mongodb://clown:kappa@ds125195.mlab.com:25195/haru", (err)=>{
	if(err) console.log(`${err}`)
	else console.log(`Mongoose activated!`)
});

//JSON schema
const UserSchema = new Mongo.Schema({
	"login":{
		"type": "string"
	},
	"password":{
		"type": "string"
	}
},
	{"collection": "users"}
);

//Model nil?
const User = conn.model(null, UserSchema);

export {User};