const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");
const should = chai.should();

chai.use(chaiHttp);

describe("Tasks", function() {
  it("should return empty string on '/' GET");
  it("should list ALL tasks on /tasks GET");
  it("should get SINGLE task on /tasks/:id GET");
  it("should list a list of tasks on /tasks/desc/:desc GET");
  it("should get SINGLE task on /tasks/:id/:desc GET");
  it("should add a task and return all tasks on /add_task/:id/:desc GET");
  it("should remove a task and return all tasks on /remove_task/:id GET");
  it("should update a task description and return all tasks on /update_task/:id/:desc GET");

});

it("should list ALL tasks on /tasks GET", function(done) {
  chai.request(server).get("/tasks").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(3);
    done();
  });
});

it("should get SINGLE task on /tasks/:id GET", function(done) {
  chai.request(server).get("/tasks/1").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(1);
    done();
  });
});

it("should list a list of tasks on /tasks/desc/:desc GET", function(done) {
  chai.request(server).get("/tasks/desc/in").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(2);
    done();
  });
});

it("should get SINGLE task on /tasks/:id/:desc GET", function(
  done
) {
  chai.request(server).get("/tasks/1/in").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(1);
    done();
  });
});


it("should add a task and return all tasks on /add_task/:id/:desc GET", function(
  done
) {
  chai.request(server).post("/tasks/4/This is the fourth task.").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(4);
    done();
  });
});

it("should remove a task and return all tasks on /remove_task/:id GET", function(
  done
) {
  chai.request(server).delete("/tasks/4").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(3);
    done();
  });
});

it("should update a task description and return all tasks on /update_task/:id/:desc GET", function(
  done
) {
  chai.request(server).put("/tasks/3/Updated 3rd.").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    res.body.should.have.lengthOf(3);
    res.body.should.eql([{ id: "1", desc: "Cut hole in box." },{ id: "2", desc: "Put junk in box." },{ id: "3", desc: "Updated 3rd." }]);
    done();
  });
});

