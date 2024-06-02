// Global Dependencies & Variables
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');

let db = require('./db/db.json');

const {writeFile} = require('fs');


// Establishing PORT for the deployment
const PORT = process.env.PORT || 3040;
const app = express();


// The man in the middle: middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



// ========== Page routes

// This is the 'Home Route' that is setting up the page to load the index.htm file. 
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})


// This is how the app directs the notes to the notes.html file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
})



// ========== Api routes

// This will read all notes that currently exist from the db.json file and fetch them.
app.get('/api/notes', (req, res) => {
  res.json(db);
})


// This will add a note to the site. 
app.post('/api/notes', (req, res) => {

  // This creates a unique ID with the <uniqid> node package.
  req.body.id = uniqid(); 

  // This takes the unique ID and adds it to the array of the note.
  db.push(req.body);

  // This takes the body of the note and adds it to the database.
  writeFile('./db/db.json', JSON.stringify(db), (err) => {
    if (err) {
    console.log("Unable to save note - server issue", err);

    } else {
      console.log("Note was created!");
    }
  })

  // This returns the new note created onto the page.
  res.json(db);
})




// This is the wild card that when a user would attempt to visit pages that dont exist, it will show this message:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});


// This code block appeaers in the Terminal, providing a link to the review the site in a developer state. 
app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
