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
    console.log(data.values)
    fetch(url, {
      method: "POST",
      body: data
    })
      .then(resp => {
        resp.json().then(data => {if (data === true) {alert("Booking overlapped !")} else {alert("Booking confirmed")}})
        
      })
      .catch(err => {
        console.log(err)
      })
  })