const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const json = 
[{name: "guy",
  message: "hello",
  type: "input"
},
{name: "gal",
  message: "bye",
  type: "input"}]


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function(req, res){

});

//Listener
app.listen(PORT, function(){
    console.log("http://localhost:" + PORT);
});

// return res.json(json);