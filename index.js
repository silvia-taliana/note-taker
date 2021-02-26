const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const db = "./db/db.json";

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reading db.json file
fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
        console.log("Error");
    }
    else {
        console.log(data);
    }
});

// Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));