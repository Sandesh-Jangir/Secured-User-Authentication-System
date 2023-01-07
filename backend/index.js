const express = require("express");
const app = express();
const connectToMongo = require("./database");

const port = 8000;

// Protecting the fetch request to get blocked by CORS.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authtoken');
  next();
});

// Connecting To DataBase
connectToMongo();

// To parse request json
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"))

app.listen(port, () => {
  console.log(`Application listening on http://localhost:${port}`);
});
