const mongoose = require("mongoose")

const BookingSchema  = new mongoose.Schema({
  _bookingId: mongoose.Schema.Types.ObjectId,
  bookingDate: Date,
  startHour: Date,
  endHour:Date,
  machineId: { type: mongoose.Schema.ObjectId, ref: "Machines"}
})

const Bookings = mongoose.model('Bookings',BookingSchema)
module.exports = Bookings