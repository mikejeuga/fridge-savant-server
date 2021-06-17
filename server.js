
const db = "mongodb+srv://mike@fridge-savant.duces.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = require('./app')
const connectDB = require('./config/db')
connectDB()
