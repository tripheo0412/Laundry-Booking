const mongoose = require("mongoose")

const MachineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  building: {
      type: String
  }
})

const Machines = mongoose.model("Machines", MachineSchema)

module.exports = Machines
