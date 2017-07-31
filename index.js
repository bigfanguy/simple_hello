const express = require("express");
const app = express();

const json = [
  { id: 1, desc: "Cut hole in box." },
  { id: 2, desc: "Put junk in box." },
  { id: 3, desc: "Open the box." }
];

app.get("/", function(req, res) {
  res.send("Howdy!");
});

function getID(id, data) {
  return data.filter(data => data.id === id);
}

function getDesc(desc, data) {
  return data.filter(data => data.desc.includes(desc));
}

function getTasks(id, desc) {
  if (typeof id === "undefined") {
    id = "default";
  }
  if (typeof desc === "undefined") {
    desc = "default";
  }

  if (id === "default" && desc === "default") {
    return json;
  } else if (id !== "default" && desc === "default") {
    return getID(id, json);
  } else if (id === "default" && desc !== "default") {
    return getDesc(desc, json);
  } else {
    return getID(id, getDesc(desc, json));
  }
}

// SHOW
app.get('/tasks/:id', (req, res) => {
  // ...
});

// INDEX
app.get("/tasks", function(req, res) {
  if (typeof req.query.desc === "undefined") {
    req.query.desc = "default";
  }
  var json_send = getTasks(req.query.id, req.query.desc);
  res.send(json_send);
});

var server = app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

module.exports = server;
