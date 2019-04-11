const mongoose = require("mongoose")

const BuildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    required: true
  }
})

const Buildings = mongoose.model('Buildings', BuildingSchema)

module.exports = Buildings 
