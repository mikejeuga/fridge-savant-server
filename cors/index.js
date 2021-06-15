const cors = require('cors')

const corsOptions = {
    credentials: true,
    origin: true
}

module.exports = cors(corsOptions)