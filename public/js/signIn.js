// document.querySelector("#signUpForm").addEventListener("submit", evt => {
//   evt.preventDefault()
//   console.log(evt.target)
//   const data = new FormData(evt.target)
//   // const fileElement = evt.target.querySelector("input[type=file]")
//   // const file = fileElement.files[0]
//   // data.append("file", file)
//   console.log("this is logic data ", data)
//   const url = "http://localhost:3000/auth/register"

//   fetch(url, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: data
//   }).then(resp => {
//     console.log("this is logic resp ", resp)
//   })
// })
document.querySelector("#signInForm").addEventListener("submit", evt => {
    evt.preventDefault()
    console.log(evt.target)
    const data = new FormData(evt.target)
    for (var value of data.values()) {
        console.log(value); 
     }
    // const fileElement = evt.target.querySelector("input[type=file]")
    // const file = fileElement.files[0]
    // data.append("file", file)
    console.log("this is logic data ", data)
    const url = "http://localhost:3000/auth/login"
  
    fetch(url, {
      method: "post",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
      body: data
    }).then(resp => {
      console.log("this is logic resp ", resp)
    })
  })