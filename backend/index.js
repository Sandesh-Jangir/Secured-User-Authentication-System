const express = require('express')
const app = express()
const connectToMongo = require("./database")
const port = 8000

// Connecting To DataBase
connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Application listening on http://localhost:${port}`)
})
