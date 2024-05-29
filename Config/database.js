const { json } = require("express");
const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI;

async function ConnectMongoDb() {
  try {
    await mongoose.connect(mongo_uri);
    console.log("database connecting succesfully");
  } catch (error) {
    console.log(json({message:  `internal server error ${error}`}))
  }
}

module.exports = {
    ConnectMongoDb
}