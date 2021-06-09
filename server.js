const express = require('express')
const app = express()
const connectDB = require("./config/db")

connectDB()


app.get("/", (req, res) => res.send("Hello"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started at ${PORT}`))