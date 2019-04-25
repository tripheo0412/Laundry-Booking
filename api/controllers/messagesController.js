const Message = require("../models/messages")

exports.message_get_all = () => {
  return Message.find({})
    .then(message => {
      return message
    })
    .catch(err => {
      return err
    })
}

exports.message_save = data => {
  var messages = new Message(data)
  return messages
    .save()
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
