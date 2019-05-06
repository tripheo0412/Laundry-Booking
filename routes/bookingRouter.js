const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const bookingController = require("../controllers/bookingController")
const userController = require("../controllers/userController")
const Booking = require("../models/booking")
const momentRange = require("moment-range")
const moment = require("moment")
momentRange.extendMoment(moment)
router.use(express.static("views"))
router.get("/", (req, res) => {
  res.render("booking.pug")
})

router.post("/new", upload.none(), (req, res) => {
  console.log(req.body)
  var machineid
  if (req.body.type == "washer") {
    machineid = "5cc2851ae95eb31632461722"
  } else {
    machineid = "5cc283c25b6cbe15c45fa693"
  }
  const userId = userController.user_find_one_name(req.body.username).id
  console.log(userId)
  const newBooking = new Booking({
    user: userId,
    bookingDate: req.body.date,
    startHour: req.body.checkIn,
    endHour: req.body.checkOut,
    machineId: machineid
  })
  var overlap = false
  bookingController.booking_find_machineId(machineid).then(bookings => {
    Object.entries(bookings).forEach(booking => {
      if (booking[1].bookingDate === req.body.date) {
        var range = moment.range(
          new Date(
            req.body.date.slice(0, 4),
            req.body.date.slice(5, 7),
            req.body.date.slice(8),
            req.body.checkIn.slice(0, 2),
            req.body.checkIn.slice(3)
          ),
          new Date(
            req.body.date.slice(0, 4),
            req.body.date.slice(5, 7),
            req.body.date.slice(8),
            req.body.checkOut.slice(0, 2),
            req.body.checkOut.slice(3)
          )
        )
        var range2 = moment.range(
          new Date(
            booking[1].bookingDate.slice(0, 4),
            booking[1].bookingDate.slice(5, 7),
            booking[1].bookingDate.slice(8),
            booking[1].startHour.slice(0, 2),
            booking[1].startHour.slice(3)
          ),
          new Date(
            booking[1].bookingDate.slice(0, 4),
            booking[1].bookingDate.slice(5, 7),
            booking[1].bookingDate.slice(8),
            booking[1].endHour.slice(0, 2),
            booking[1].endHour.slice(3)
          )
        )
        if (range.overlaps(range2)) {
          overlap = true
        }
      }
    })
    if (overlap) {
      console.log("Booking overlapped")
      res.send(true)

    } else {
      newBooking
        .save()
        .then(booking => {
          console.log("booking ", booking)
          res.send(booking)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500)
        })
    }
  })
})

router.get("/all", (req, res) => {
  bookingController
    .bookings_get_all()
    .then(bookings => {
      console.log(bookings)
      res.send(bookings)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

module.exports = router
