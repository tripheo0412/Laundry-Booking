const express = require("express")
const router = express.Router()
const Message = require("../models/messages")
const messagesController = require("../controllers/messagesController")

router.get("/", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

router.get("/:user", (req, res) => {
  var user = req.params.user
  Message.find({ name: user }, (err, messages) => {
    res.send(messages)
  })
})

router.post("/", async (req, res) => {
  try {
    var io = req.app.get("socketio")
    var message = new Message(req.body)

    var savedMessage = await message.save()
    console.log("saved")

    var censored = await Message.findOne({ message: "badword" })
    if (censored) await Message.remove({ _id: censored.id })
    else io.emit("message", req.body)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
    return console.log("error", error)
  } finally {
    console.log("Message Posted")
  }
})

module.exports = router
