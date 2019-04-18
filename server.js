require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cp = require("cookie-parser")
const bp = require("body-parser")
const expressLayouts = require("express-ejs-layouts")
const passport = require("passport")
const userRouter = require("./api/routes/userRouter")
const authRouter = require("./api/routes/authRouter")

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const app = express()// EJS
app.use(expressLayouts)
app.set("view engine", "ejs")
app.use(passport.initialize())
require("./api/config/passport")(passport)

app.use(cp())
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())


app.get("/", (req, res) => {
  res.send("OK")
})
app.use('/user',passport.authenticate('jwt',{session:false}),userRouter)
app.use('/auth',authRouter)
app.listen(3000)
