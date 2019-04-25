const express = require("express")
const router = express.Router()
router.use(express.static("views"))
router.get("/", (req,res)=> {
    res.render('booking.pug')
})

module.exports = router