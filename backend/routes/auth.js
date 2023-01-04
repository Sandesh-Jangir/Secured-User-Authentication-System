const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/authenticateToken")

// JWT Secret. [Idealy should not be in public code].
const JWT_SECRET = "secret@$example.";

// Adding the user to the database.
router.post(
  "/signup",
  // Adding validations for request values.
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("work").exists(),
  ],
  async (req, res) => {
    // Checking validation and handling validation errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    // Hashing the password.
    let salt = await bcryptjs.genSalt(10);
    let hashedPassword = await bcryptjs.hash(req.body.password, salt);
    // Creating a new user
    const fetchedUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      work: req.body.work,
    });

    // Saving the user in the database.
    try {
      await fetchedUser.save();
      // Generating jwt payload.
      const webTokenPayload = {
        webTokenUser: {
          id: fetchedUser.id,
        },
      };
      // Signing JWT Token.
      const authToken = jwt.sign(webTokenPayload, JWT_SECRET);
      res.json({ success: true, authToken }); // response.
    } catch (error) {
      // If an user with same email already exists.
      res.status(400).json({
        error: "The user with this email already exists",
        email: error["keyValue"]["email"],
      });
    }
  }
);

// Logging in the user.
router.post(
  "/login",
  // Validations for the request variables.
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    // Checking validation and handling validation errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }
    // Email & password from the request body.
    const { email, password } = req.body;
    // Finding the user.
    const fetchedUser = await User.findOne({ email }).select("");
    try {
      // Comparing the passwords.
      const passwordCompared = await bcryptjs.compare(
        password,
        fetchedUser.password
      );
      // If the user with the requested email and password exists.
      if (fetchedUser && passwordCompared) {
        // Generating jwt payload.
        const webTokenPayload = {
          webTokenUser: {
            id: fetchedUser.id,
          },
        };
        // Signing JWT Token.
        const authToken = jwt.sign(webTokenPayload, JWT_SECRET);
        return res.json({ success: true, authToken }); // response.
      } else {
        res.status(400).json({ success: false, error: "Invalid Credentials." });
      }
    } catch (error) {
      // If the user with the given email does not exists.
      res.status(404).json({ success: false, error: "user not found." });
    }
  }
);

// Authenticating the token and then sending the user from token payload as response.
router.post("/auth-token", authenticateToken, async(req, res)=>{
    // Fetching the verified token's user from the database.
    const tokenVerifiedUser = await User.findOne({_id: req.user.id}).select("-password")
    res.json({success:true, user: tokenVerifiedUser})// response.
})

module.exports = router;