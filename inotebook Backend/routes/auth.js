const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


// Create a User using POST: (/api/auth/createuser) No authentication required.

router.post('/createuser', [
    body("name").isLength({ min: 3 }),
    body("email").isEmail().withMessage("Email is required")
    ,body("password").isLength({ min: 8 }),
  ],

  async (req, res) => {
  const errors = validationResult(req)

    // if there are errors return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })  
    }

    //Check wether the user with this email exists already
    try {

    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }) 
    res.json(user);

  } 
  catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured")
  }
  });

module.exports = router;
