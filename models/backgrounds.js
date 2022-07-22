const { Schema, model } = require("mongoose"); 

module.exports = model("backgroundsDB", new Schema({
   userId: String, 
   backgroundURL: String, 
   progressbar: String,
   status: String
}))