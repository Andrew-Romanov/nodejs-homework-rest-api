const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')

// const PORT = process.env.PORT || 3000
const { DATABASE_HOST, SERVER_PORT = 3000 } = process.env

mongoose.connect(DATABASE_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => {
    console.log('Database connection successful')
    app.listen(SERVER_PORT, () => {
      console.log(`Server running. Use our API on port: ${SERVER_PORT}`)
    })
  })
  .catch(error => {
    console.error(error.message)
    process.exit(1)
  })
