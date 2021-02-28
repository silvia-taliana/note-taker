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
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(note);
});

app.post('/api/notes', (req, res) => {

    // reading db.json file
    fs.readFileSync(db, (err, data) => {
        if (err) {
            console.log("Error");
        }
        else {
            note = JSON.parse(data);
            // console.log(note);
        }
    });

    const newNote = req.body;
    newNote.id = uniqid();
    note.push(newNote);
    console.log(note);

    fs.writeFileSync(db, JSON.stringify(note));
    res.json(note);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));