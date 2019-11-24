const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = [];
const note = {};
const app = express();
const PORT = 3000;

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


app.post("/api/notes", function(req, res){
    var title=req.body.note;
    var note=req.body.note;
    console.log("User name = "+title+", password is "+note);
    res.end("yes");
});

//Listener
app.listen(PORT, function(){
    console.log("http://localhost:" + PORT);
});


// return res.json();