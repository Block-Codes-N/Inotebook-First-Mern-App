const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


// Create a User using POST: (/api/auth/) No authentication required.

router.post('/', [
    body("name").isLength({ min: 3 }),
    body('email').isEmail().bail().custom(async value => {
      const existingUser = await User.findByEmail(value);
      if (existingUser) {
        // Will use the below as the error message
        throw new Error('A user already exists with this e-mail address');
      }
    }),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })  
    }

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

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(user => res.json(user));
    
    
    // res.send(req.body);  //Without User.create method.
})
    

module.exports = router;