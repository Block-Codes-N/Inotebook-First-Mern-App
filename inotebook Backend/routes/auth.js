const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // Used for hashing and comparing passwords
const jwt = require("jsonwebtoken"); // Used for creating JSON web tokens
const fetchuser = require('../middleware/fetchuser'); 
const JWT_SECRET = "Noman is a good boy"; // Secret key for JWT

//Route #1 Create a User using POST: (/api/auth/createuser) No authentication required.

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }), // Validate the 'name' field to ensure it has at least 3 characters
    body("email").isEmail().withMessage("Email is required"), // Validate the 'email' field to ensure it's a valid email address
    body("password").isLength({ min: 8 }), // Validate the 'password' field to ensure it has at least 8 characters
  ],

  async (req, res) => {
    const errors = validationResult(req);

    // if there are validation errors, return a 400 Bad Request response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether a user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      // Generate a salt and hash the user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user in the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // Create a JWT token for the user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // Return the JWT token as a response
      res.json({ authToken });
    } catch (error) {
      // Handle any errors that occur during this process
      console.error(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

//Route #2 Authenticate a User using POST: (/api/auth/login) No authentication required.

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"), // Validate the 'email' field to ensure it's a valid email address
    body("password").exists(), // Ensure that the 'password' field exists
  ],

  async (req, res) => {
    const errors = validationResult(req);

    // If there are validation errors, return a 400 Bad Request response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find the user in the database by email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User does not exist with these credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "User does not exist with these credentials" });
      }

      // Create a JWT token for the user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // Return the JWT token as a response
      res.json({ authToken });
    } catch (error) {
      // Handle any errors that occur during this process
      console.error(error.message);
      res.status(500).send("Internal Server Error Occurred");
    }
  }
);





//Route #3 Get logged In User Details using POST: (/api/auth/loggedIn) Authentication required.
router.post(
  "/loggedIn",fetchuser,

  async (req, res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  // Handle any errors that occur during this process
  console.error(error.message);
  res.status(500).send("Internal Server Error Occurred");
}

  });

module.exports = router;