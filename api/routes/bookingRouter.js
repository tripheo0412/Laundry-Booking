const express = require("express")
const router = express.Router()
const path = require("path")
router.use(express.static("public"))
router.get("/", (req,res)=> {
    res.render('../../public/Booking.html')
})

module.exports = router