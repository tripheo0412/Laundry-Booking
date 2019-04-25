const mongoose = require("mongoose")

const BuildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  resident: {
      type: Array
  },
  washer: {
      type: Array
  },
  dryer: {
      type: Array
  }
})

const Buildings = mongoose.model('Buildings', BuildingSchema)

module.exports = Buildings 
