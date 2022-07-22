const { Schema, model } = require("mongoose"); 

module.exports = model("settingsDB", new Schema({
   	guildId: String, 
   	logId: String,
   	verdictId: String, 
   	speciallogId: String, 
	bot_manager: String, 
	rankId: String,
	case: Number, 
}))