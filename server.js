const express = require('express')
const app = express()
const connectDB = require('./config/db')

connectDB()


//Initialize Middleware
app.use(express.json({extended: false}))


app.get("/", (req, res) => res.send("Hello"))

//Routes

app.use('/api/users', require('./routers/users'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started at ${PORT}`))