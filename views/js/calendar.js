var result = []
const generateEvents = () => {
  const url = "/booking/all"
  fetch(url, {
    method: "GET"
  })
    .then(resp =>
      resp.json().then(data => {
        data.forEach(booking => {
          var smallResult = {
            title: String,
            start: String,
            end: String
          }
          if (booking.machineId == "5cc2851ae95eb31632461722") {
            smallResult.title = "Washer"
          } else {
            smallResult.title = "Dryer"
          }
          smallResult.start = `${booking.bookingDate}T${booking.startHour}:00`
          smallResult.end = `${booking.bookingDate}T${booking.endHour}:00`
          result.push(smallResult)
        })
        console.log(result)
      })
    )
    .catch(err => {
      console.log(err)
    })
}
document.addEventListener("DOMContentLoaded", () => {
  var calendarEl = document.getElementById("calendar")
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list"],
    height: "parent",
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    },
    defaultView: "timeGridWeek",
    defaultDate: "2019-05-03",
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: []
  })

  // generateEvents().then(() => {
  //   calendar.events = result
  // })

  calendar.render()
})
