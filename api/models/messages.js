const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Messages = mongoose.model('Messages', MessageSchema)

module.exports = Messages
