const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');   // decrypting the plain password to hash
const jwt = require('jsonwebtoken');  // requiring import the package for login token

const JWT_SECRET = "Noman is a good boy";


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

    const salt = await bcrypt.genSalt(10);                       //adding salt to the password
    const secPass = await bcrypt.hash(req.body.password,salt);    //converting plain password to the haash.


    user = await User.create({                 //Creating user in the database 
      name: req.body.name,
      email: req.body.email,
      password: secPass
    }) 
      const data = {
        user:{
          id : user.id,
        }
      }
    const authToken = jwt.sign(data, JWT_SECRET)
    // res.json(user);          //Response showing 
    res.json({authToken}); 

  } 


  catch (error) {             //catching error in the code 
      console.error(error.message);
      res.status(500).send("Some Error Occured")
  }
  });

module.exports = router;
