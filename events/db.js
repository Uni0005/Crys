const mongoose = require('mongoose')
const mongo_uri = require('../cfg.json')

module.exports = (client) => {
    if(!mongo_uri) return;

    mongoose.connect(mongo_uri, {
        useFindAndModify: true,
        useUnifiedTopology: true
        }).then(console.log("Connected"));
}