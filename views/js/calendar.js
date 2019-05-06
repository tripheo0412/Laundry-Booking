var result = []
var config = {
  plugins: ["interaction", "dayGrid", "timeGrid", "list"],
  height: "parent",
  header: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
  },
  defaultView: "timeGridWeek",
  //defaultDate: "2019-05-03",
  navLinks: true, // can click day/week names to navigate views
  editable: true,
  eventLimit: true, // allow "more" link when too many events
  events: []
  
}
const generateEvents = () => {
  const url = "/booking/all"
  fetch(url, {
    method: "GET"
  })
    .then(resp =>
      resp.json().then(async data => {
        await data.forEach((booking, i = 1) => {
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
          console.log(i)
          config.events[i] = smallResult
        })
        var calendarEl = await document.getElementById("calendar")
        var calendar = await new FullCalendar.Calendar(calendarEl, config)
        await calendar.render()
      })
    )
    .catch(err => {
      console.log(err)
    })
}
generateEvents()
// document.addEventListener("DOMContentLoaded", async () => {
//   await generateEvents()

//   console.log(config)
//   var calendarEl = await document.getElementById("calendar")
//   var calendar = await new FullCalendar.Calendar(calendarEl, config)
//   calendar.render()
// })
