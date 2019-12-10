const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const db = require("./db/db.json");
// const port = process.env.PORT || 3000;

const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"),(err, data)=>{
    if (err) throw err;
 }));

const dbUpdate = dbData => {
        fs.writeFileSync(path.join(__dirname, "/db/db.json"),
        JSON.stringify(dbData),
        err => {
           if (err) throw err;
        })}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//html and css shit
app.get("/assets/css/styles.css", function(req,res) {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"))
 });

app.get("/assets/js/index.js", function(req,res){
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
 });

//Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
 });

 app.get("/api/notes", function(req,res){
    return res.json(dbData);
 })

app.post("/api/notes", function(req, res){
    let note = req.body;
    let id = dbData.length;
    note.id = id + 1;
    dbData.push(note);
    dbUpdate(dbData);
    return res.json(dbData);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    var interval = 1;
    dbData.splice(`${id - 1}`, 1);
    for(var i = 0; i < dbData.length; i++){
        dbData[i].id = interval;
        interval = interval + 1;
    }
    dbUpdate(dbData);
    res.send(dbData);
});

//Listener
app.listen(port, function(){
    console.log("http://localhost:"+port);
});