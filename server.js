require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cp = require("cookie-parser")
const bp = require("body-parser")
const passport = require("passport")
const userRouter = require("./api/routes/userRouter")
const authRouter = require("./api/routes/authRouter")
const bookingRouter = require("./api/routes/bookingRouter")
const messageRouter = require("./api/routes/messageRouter")
const path = require("path")
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(passport.initialize())
require("./api/config/passport")(passport)


app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/SignIn.html"))
})
app.post("/test",(res,req) => {
  console.log(req.body)
  res.send(ok)
})
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter)
app.use("/booking", bookingRouter)
app.use("/messages", messageRouter)
app.use("/auth", authRouter)
app.listen(3000)
