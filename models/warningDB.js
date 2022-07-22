const { Schema, model } = require("mongoose"); 

module.exports = model("punishmentsDB", new Schema({
	guildId: String,
    userId: String, 
	userTag: String,
	moderatorId: String, 
	reason: String,
	length: String,
	proofs: String,
	vid: String,
	timestamp: String, 
	case: Number, 
	type: String
}))