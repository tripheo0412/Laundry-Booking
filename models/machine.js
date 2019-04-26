const mongoose = require("mongoose")


const MachineSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  bookings: { type: mongoose.Schema.ObjectId, ref: "Bookings"}
})

const Machines = mongoose.model("Machines", MachineSchema)

module.exports = Machines
