require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")
const bookingRouter = require("./routes/bookingRouter")
const messageRouter = require("./routes/messageRouter")
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
var http = require("http").Server(app)
var io = require("socket.io")(http)
io.on("connection", socket => {
  console.log("a user is connected")
})
app.set("socketio", io)
app.use(passport.initialize())
require("./config/passport")(passport)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("views"))
app.set("view engine", "pug")
app.get("/", (req, res) => {
  res.render("signIn")
})
app.get("/signUp", (req,res) => {
  res.render('signUp')
})
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter)
app.use(
  "/booking",
  passport.authenticate("cookie", { session: false }),
  bookingRouter
)
app.use(
  "/messages/",
  passport.authenticate("cookie", { session: false }),
  messageRouter
)
app.use("/auth", authRouter)
http.listen(3000)
