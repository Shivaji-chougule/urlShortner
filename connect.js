const mongoose = require("mongoose");

async function connectMogoDb(url){
return mongoose.connect(url)
}

module.exports = {connectMogoDb}