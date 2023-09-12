const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


// Create a User using POST: (/api/auth/) No authentication required.

// router.post('/', [
//     body("name").isLength({ min: 3 }),
//     body('email').isEmail()
//     // .findUserByEmail = (email) => {
//     //     // return this.findOne({ email: email })
//     //   return User.findOne({ email: email })
//     //   }
//       // if (existingUser) {
//       //   // Will use the below as the error message
//       //   throw new Error('A user already exists with this e-mail address');
//       // }
//     ,
//     body("password").isLength({ min: 8 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })  
//     }
//       try {
//     const userExists = await User.findOne({email:email})

//     if(userExists){
//       return res.json({error: "please use different email"});
//     }
//   }
//   catch (error) {
//         console.log(error);
//       }


    // User.findUserByEmail = (email) => {
    //   return this.findOne({ email: email })
    //   // or return User.findOne({ email: email })
    // }

  //   User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   }).then(user => res.json(user));

  // });
    
    
    // res.send(req.body);  //Without User.create method.
    router.post('/', async(req, res) =>{

  // const(name,password,email) = req.body;

  if(!name || !email || !password){
    return res.json({error:'please fill all'});
  }

  try {
    const userExists = await User.findOne({email:email})

    if(userExists){
      return res.json({error: "please use different email"});
    }
    else{
      const user = new User({name,password,email});
      await user.save();
      res.json({message: "USer Registered"})
    }
  } 
  
  catch (error) {
    console.log(error);
  }
})

module.exports = router;



                                                                                                //   try {
                                                                                                //     const user = await User.create({
                                                                                                //       name: req.body.name,
                                                                                                //       email: req.body.email,
                                                                                                //       password: req.body.password
                                                                                                //     });
                                                                                                //     res.json(user);
                                                                                                //   } catch (error) {
                                                                                                //     if (error.code === 11000) {
                                                                                                //       // Duplicate key error
                                                                                                //       return res.status(400).json({ error: 'Email already exists' });
                                                                                                //     }
                                                                                                //     console.error(error);
                                                                                                //     res.status(500).json({ error: 'Server error' });
                                                                                                //   }
                                                                                                // });