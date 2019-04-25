const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  name: String,
  message: String
})

const Messages = mongoose.model("Messages", MessageSchema)

module.exports = Messages
