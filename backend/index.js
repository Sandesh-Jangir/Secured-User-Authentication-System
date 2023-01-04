const express = require("express");
const app = express();
const connectToMongo = require("./database");

const port = 8000;

// Connecting To DataBase
connectToMongo();

// To parse request json
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"))

app.listen(port, () => {
  console.log(`Application listening on http://localhost:${port}`);
});
