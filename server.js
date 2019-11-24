const express = require("express");
const fs = require("fs");

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
    return res.json(json);
});

app.get("/notes", function(req, res){

});

//Listener
app.listen(PORT, function(){
    console.log("http://localhost:" + PORT);
});