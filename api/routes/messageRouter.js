const express = require("express")
const router = express.Router()
const messagesController = require("../controllers/messagesController")
router.get("/messages", (req, res) => {
  messagesController
    .message_get_all()
    .then(messages => {
      res.send(messages)
    })
    .catch(err => {
      res.send(err)
    })
})

router.post("/messages", (req, res) => {
  messagesController
    .message_save(req.body)
    .then(res => {
      res.sendStatus(500)
    })
    .catch(err => {
      res.sendStatus(200)
    })
})

module.exports = router
