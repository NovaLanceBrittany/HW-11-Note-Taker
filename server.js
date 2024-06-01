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


// This is the wild card that when a user would attempt to visit pages that dont exist, it will show this message:
app.get('*', (req, res) =>
  res.send(
    `Note/Page does not Exist. Please double check your path and try again.`
  )
);


// This is how the app directs the notes to the notes.html file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
})


// ========== Api routes

// This will read all notes that currently exist from the db.json file and fetch them.
app.post('/api/notes', (req, res) => {
  res.json(db);
})


// This will read and fetch a specific Note by its Id (auto-generated).
app.post('/api/notes/noteId', (req, res) => {
  res.json(db);


  
})







// This code block appeaers in the Terminal, providing a link to the review the site in a developer state. 
app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
