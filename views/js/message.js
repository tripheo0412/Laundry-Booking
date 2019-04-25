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
    `<h4> ${message.name} </h4> <p> ${message.message} </p>`
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
