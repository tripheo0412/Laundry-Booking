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
    `<p>${message.name}: ${message.message}</p>`
  )
}

function getMessages() {
  $.get("/messages", data => {
    data.forEach(addMessages)
  })
}

function sendMessage(message) {
  $.post("/messages", message)
}
