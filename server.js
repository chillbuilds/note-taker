const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8800;
const db = require("./db/db.json");
// const port = process.env.PORT || 3000;

const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"),(err, data)=>{
    if (err) throw err;
 }));

const dbUpdate = dbData => {
        let filtered = dbData.filter(function(input) {
           return input != null;
        });
        fs.writeFileSync(path.join(__dirname, "/db/db.json"),
        JSON.stringify(filtered),
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
    let id = req.params.id;
    if(id === 1){
        delete dbData[id];
    }else{
    delete dbData[id -1];}
    dbUpdate(dbData);
    res.send(dbData);
});

//Listener
app.listen(port, function(){
    console.log("http://localhost:"+port);
});