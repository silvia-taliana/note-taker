const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const db = "./db/db.json";
const uniqid = require('uniqid');
let note = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(note);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// function to write new notes
app.post('/api/notes', (req, res) => {

    // reading db.json file
    fs.readFile(db, (err, data) => {
        if (err) {
            console.log("Error");
        }
        else {
            note = JSON.parse(data);
            const newNote = req.body; // getting user input
            newNote.id = uniqid(); // adding id to note
            note.push(newNote); // pushing new note to array
            console.log(note);

            fs.writeFile(db, JSON.stringify(note), (err) => {
                if (err) {
                    console.log("Error");
                }
                else {
                    res.json(note);
                }
            }); // writing note to db.json
        }
    });
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));