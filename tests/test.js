const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");
const should = chai.should();

chai.use(chaiHttp);

describe("Tasks", function() {
  it("should list ALL tasks on /tasks GET");
  it("should list a list of tasks on /tasks?id=<id> GET");
  it("should list a list of tasks on /tasks?desc=<desc> GET");
  it("should list a list of tasks on /tasks?id=<id>desc=<desc> GET");
});

it("should list ALL tasks on /tasks GET", function(done) {
  chai.request(server).get("/tasks").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    done();
  });
});

it("should list a list of tasks on /tasks?id=<id> GET", function(done) {
  chai.request(server).get("/tasks?id=1").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    done();
  });
});

it("should list a list of tasks on /tasks?desc=<desc> GET", function(done) {
  chai.request(server).get("/tasks?desc=box").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    done();
  });
});

it("should list a list of tasks on /tasks?id=<id>desc=<desc> GET", function(
  done
) {
  chai.request(server).get("/tasks?id=1&desc=box").end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("array");
    done();
  });
});
