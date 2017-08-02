const express = require("express");
const app = express();

// In Memory databse
const json = [
  { id: "1", desc: "Cut hole in box." },
  { id: "2", desc: "Put junk in box." },
  { id: "3", desc: "Open the box." }
];

function getID(id, data) {
  return data.filter(data => data.id === id);
}

function getDesc(desc, data) {
  return data.filter(data => data.desc.includes(desc));
}


// INDEX (needs test)
app.get("/", function(req, res) {
  res.send("");
});

// SHOW desc, order matters, match desc first if no match then use :id/:desc
app.get('/tasks/desc/:desc', (req, res) => {
  res.send(getDesc(req.params.desc, json));
});

// SHOW both
app.get('/tasks/:id/:desc', (req, res) => {
 res.send(getID(req.params.id, getDesc(req.params.desc, json)));
});

// SHOW ID
app.get('/tasks/:id', (req, res) => {
  res.send(getID(req.params.id, json));
});

// GETALL
app.get("/tasks", function(req, res) {
  res.send(json);
});

// ADD
app.post("/tasks/:id/:desc", function(req, res) {
  let a = {id:req.params.id, desc:req.params.desc};
  json.push(a);
  res.send(json);
});

// REMOVE by ID
app.delete("/tasks/:id", function(req, res) {
  json.forEach(function(result, index) {
    if(result['id'] === req.params.id) {
      //Remove from array
      json.splice(index, 1);
    }    
  });
  res.send(json);
});

// UPDATE
app.put("/tasks/:id/:desc", function(req, res) {
  json.forEach(function(result, index) {
    if(result['id'] === req.params.id) {
      //update desc
      json[parseInt(req.params.id) - 1].desc = req.params.desc;
    }    
  });
  res.send(json);
});

var server = app.listen(3000, function() {
  console.log("Example app listening on localhost:3000!");
});

module.exports = server;
