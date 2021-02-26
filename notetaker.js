const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const db = "./db/db.json";
let note = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// reading db.json file
fs.readFile(db, (err, data) => {
    if (err) {
        console.log("Error");
    }
    else {
        note = JSON.parse(data);
        // console.log(note);
    }
});

// Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(note);
    // console.log(res.json(JSON.parse(note)));
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    note.push(newNote);
    console.log(note);
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

