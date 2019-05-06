const openForm = () => {
  document.getElementById("myForm").style.display = "block"
}

const closeForm = () => {
  document.getElementById("myForm").style.display = "none"
}

document.querySelector("#bookingForm").addEventListener("submit", evt => {
  evt.preventDefault()
  const data = new FormData(evt.target)
  data.append("username", localStorage.getItem("user"))
  const url = "/booking/new"
  fetch(url, {
    method: "POST",
    body: data
  })
    .then(resp => {
      window.location.reload()
      resp.json().then(data => {
        if (data === true) {
          alert("Booking overlapped !")
        } else {
          alert("Booking confirmed")
        }
      })
    })
    .catch(err => {
      console.log(err)
    })
})


