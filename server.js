require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

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

app.get("/", (req, res) => {
  res.send("OK")
})

app.listen(3000)
