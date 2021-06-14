const express = require('express')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const config = require('config')
const db = config.get('mongoURI')
const corsMiddleware = require('./cors')
const app = express()



const bcrypt = require('bcryptjs')

const PORT = process.env.PORT || 5000

app.use(express.json({extended: false}))

app.use(corsMiddleware)

const store = new MongoDBSession({
    uri: db,
    collection: 'sessions'
})

app.use(session({
    secret: 'mydirtysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie : {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.get("/", (req, res) => {
    console.log(res.cookies)
    res.send("Hello")
})
//Routes
app.use('/api/users', require('./routers/users'));




app.listen(PORT, () => console.log(`server started at ${PORT}`))

module.exports = app;