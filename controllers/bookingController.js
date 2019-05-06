const Booking = require("../models/booking")

exports.bookings_get_all = () => {
  return Booking.find()
    .then(booking => {
      return booking
    })
    .catch(err => {
      return err
    })
}

exports.booking_create_new = data => {
  return Booking.create(data)
    .then(booking => {
      return booking
    })
    .catch(err => {
      return err
    })
}

exports.booking_find_machineId = id => {
  return Booking.find({
    machineId: id
  })
    .then(machine => {
      return machine
    })
    .catch(err => {
      return err
    })
}

