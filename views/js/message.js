var socket = io()
var username = localStorage.getItem('user')
$(() => {
  $("#send").click(() => {
    sendMessage({ name: username, message: $("#message").val() })
  })

  getMessages()
})

socket.on("message", addMessages)

function addMessages(message) {
  $("#messages").append(
    `<h5> ${message.name} </h5> <p> ${message.message} </p>`
  )
}

function getMessages() {
  $.get("http://localhost:3000/messages", data => {
    data.forEach(addMessages)
  })
}

function sendMessage(message) {
  $.post("http://localhost:3000/messages", message)
}