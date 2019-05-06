const mongoose = require("mongoose")

const BookingSchema  = new mongoose.Schema({
  _bookingId: mongoose.Schema.Types.ObjectId,
  bookingDate: String,
  startHour: String,
  endHour:String,
  machineId: { type: mongoose.Schema.ObjectId, ref: "Machines"},
  userId: { type: mongoose.Schema.ObjectId, ref: "Users"}
})

const Bookings = mongoose.model('Bookings',BookingSchema)
module.exports = Bookings