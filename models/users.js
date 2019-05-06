const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  bookings: { type: mongoose.Schema.ObjectId, ref: "Bookings"}
})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users
