const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = [];
const note = {};
const app = express();
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function(req, res){
    return res.json(notes);
});

app.get("/api/notes/:note", function(req, res){
    var chosen = req.params.note;

    console.log(chosen);

    for( var i = 0; i < notes.length; i++){
        if(chosen === notes[i].routeName){
            return res.json(notes[i]);
        }
    }
})


app.post("/api/notes", function(req, res){
    var newNote = req.body;
    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
    notes.push(newNote);
    res.json(newNote);
});

//Listener
app.listen(port, function(){
    console.log(port);
});


// return res.json();



//Routes
// app.get("/", function(req, res){
//     res.sendFile(path.join(__dirname, "public/index.html"))
// });

// app.get("/notes", function(req, res){
//     res.sendFile(path.join(__dirname, "public/notes.html"))
// });
