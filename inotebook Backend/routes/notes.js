const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require('../models/Notes');


// Route # 1 Add a new note using: post "api/auth/notesFetched". Login required
router.post('/notesFetched', fetchuser, async(req, res) => {
    try {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
    
        
    } catch (error) {
        // Handle any errors that occur during this process
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      }
})


// Route # 2 Add a new note using: post "api/auth/notesFetched". Login required
router.post('/addNotes', fetchuser,
[
  body("Title", "Enter a valid title").isLength({ min: 3 }), // Validate the 'name' field to ensure it has at least 3 characters
  body("Description", "Description must be atleast 8 characters").isLength({ min: 8 }), // Validate the 'password' field to ensure it has at least 8 characters
], async(req, res) => {

    try {
    const {title, description, tags} = req.body;
    const errors = validationResult(req);

    // if there are validation errors, return a 400 Bad Request response
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes = new Note({
        title, description, tags, user: req.user.id
    })

    const savedNote = await notes.save();
    res.json(savedNote);

   
        
    } catch (error) {
        // Handle any errors that occur during this process
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      }
})

module.exports = router;  