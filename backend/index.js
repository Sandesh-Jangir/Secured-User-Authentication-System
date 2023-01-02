const express = require("express");
const app = express();
const connectToMongo = require("./database");
const User = require("./UserSchema");
const { body, validationResult } = require("express-validator");
const port = 8000;

// Connecting To DataBase
connectToMongo();

// To parse request json
app.use(express.json());

app.get(
  "/api/signup",
  // Adding validations for request values.
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("work").exists(),
  ],
  (req, res) => {
    // Checking validation and handling validation errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Creating a new user
    const fetchedUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      work: req.body.work,
    });
    // Saving the user in the database.
    fetchedUser.save();
    res.json(fetchedUser); // response.
  }
);

app.listen(port, () => {
  console.log(`Application listening on http://localhost:${port}`);
});
