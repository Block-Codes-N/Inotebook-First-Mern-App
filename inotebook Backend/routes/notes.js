const express = require("express");
const fetchuser = require("../middleware/fetchuser"); // Import the fetchuser middleware
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes"); // Import the Notes model

// Route #1: Fetch user's notes
router.post("/notesFetched", fetchuser, async (req, res) => {
    try {
        // Fetch notes associated with the authenticated user
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes); // Respond with the fetched notes
    } catch (error) {
        // Handle any errors that occur during this process
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
});

// Route #2: Add a new note
router.post(
    "/addNotes",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }), // Validate the 'title' field to ensure it has at least 3 characters
        body("description", "Description must be at least 8 characters").isLength({
            min: 8,
        }), // Validate the 'description' field to ensure it has at least 8 characters
    ],
    async (req, res) => {
        try {
            const { title, description, tags } = req.body;
            const errors = validationResult(req);

            // If there are validation errors, return a 400 Bad Request response
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Create a new note with the provided data and user ID
            const notes = new Notes({
                title,
                description,
                tags,
                user: req.user.id,
            });

            // Save the note to the database
            const savedNote = await notes.save();

            res.json(savedNote); // Respond with the saved note
        } catch (error) {
            // Handle any errors that occur during this process
            console.error(error.message);
            res.status(500).send("Some Error Occurred");
        }
    }
);

// Route #3: Updating an existing note using: Put "api/notes/updatenote/:id"
router.put("/updatenote/:id", fetchuser, async (req, res) => {

    try {
        
        const { title, description, tags } = req.body;
        //Create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tags) {
            newNote.tags = tags;
        }

        // Find the note to be updated and update it.
        let notes = await Notes.findById(req.params.id);
        if (!notes) {
            return res.status(404).send("Not Found");
        }

        if (notes.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        notes = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ notes });

    } catch (error) {
        return res.status(401).send("Not Allowed");
    }
        // const note = Note.findByIdAndUpdate()
});
module.exports = router; // Export the router for use in other parts of the application
