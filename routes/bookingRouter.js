const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const bookingController = require("../controllers/bookingController")
const userController = require("../controllers/userController")
const Booking = require("../models/booking")
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
