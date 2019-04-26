const openForm = () => {
    document.getElementById("myForm").style.display = "block"
}

const closeForm = () => {
    document.getElementById("myForm").style.display = "none"
}

document.querySelector("#bookingForm").addEventListener("submit", evt => {
    evt.preventDefault()
    const data = new FormData(evt.target)
    const url = "/booking/new"
    console.log(data.values)
    fetch(url, {
      method: "POST",
      body: data
    })
      .then(resp => {
        console.log(resp)
        
      })
      .catch(err => {
        console.log(err)
      })
  })