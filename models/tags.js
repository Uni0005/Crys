const { Schema, model } = require("mongoose"); 

module.exports = model("tagsDB", new Schema({
   	guildId: String, 
    name: String,
	type: String,
   	content: String, 
	color: String, 
	title: String
}))