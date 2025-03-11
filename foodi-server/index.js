const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001
const mongoose = require('mongoose')
require('dotenv').config() // for reading .env file

app.use(cors()) // for cross-origin requests
app.use(express.json()) // for parsing application/json

// husnainsardar07
// OIwUnQZcd0gKJ6wI


// mongodb configuration using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-db.ehzfk.mongodb.net/demo-foodi-db?retryWrites=true&w=majority&appName=demo-foodi-db`).then(
  () => {
    console.log('✅ Connected   to MongoDB')
  }
).catch( (error) => {
  console.log('Error Connecting the MongoDB Server: ', error)
})

const menuRoutes= require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
 

app.use('/menu', menuRoutes); // for menu routes
app.use('/carts', cartRoutes) // for cart routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`✅ Example app listening on port ${port}`)
})