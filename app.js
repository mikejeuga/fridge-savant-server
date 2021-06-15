const express = require('express')
const config = require('config')
const db = config.get('mongoURI')
const corsMiddleware = require('./cors')
const app = express()



const bcrypt = require('bcryptjs')

const PORT = process.env.PORT || 5000

app.use(express.json({extended: false}))

app.use(corsMiddleware)



app.get("/", (req, res) => {
})
//Routes
app.use('/api/users', require('./routers/users'));




app.listen(PORT, () => console.log(`server started at ${PORT}`))

module.exports = app;