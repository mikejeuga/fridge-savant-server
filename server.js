const app = require('./app')
const connectDB = require('./config/db')

const init = async () => {
  const connected = await connectDB()

  console.log("started")
}

init()
