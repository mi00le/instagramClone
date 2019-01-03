/* eslint-disable */

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

const users = ("../functions-db/users");
const posts = ("../functions-db/posts");

const username = "testaccount@email.com";
const password = "testpassword";
const displayname = "testname";

let token = "";
let uid = "";

const db = require("../functions-db/db-init.js").getDb();
db.prepare("DELETE FROM Users").run();
db.prepare("DELETE FROM Posts").run();
describe("Users", () => {
    describe("/POST users", () => {
        it("it should 200, create user and return user and token", (done) => {
            chai.request(server).post("/users")
                .set("content-type", "application/x-www-form-urlencoded")
                .send({email: username, password: password, displayName: displayname})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("user");
                    res.body.data.user.should.have.property("email").equal(username);
                    res.body.data.user.should.have.property("displayName").equal(displayname);
                    res.body.should.have.property("token");
                    token = res.body.token;
                    done();
                });
        });
        it("it should 403, user already exists", (done) => {
            chai.request(server).post("/users")
                .set("content-type", "application/x-www-form-urlencoded")
                .send({email: username, password: password, displayName: displayname})
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("err");
                    done();
                });
        });
    });

    describe("/GET users", () => {
        it("it should 403 without auth", (done) => {
            chai.request(server).get("/users")
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
        it("it should return an array of 1 element, status 200 with auth", (done) => {
            chai.request(server).get("/users")
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("users").a("array");
                    res.body.users.length.should.be.equal(1);
                    done();
                });
        });
        it("it should 403 with an invalid token", (done) => {
            chai.request(server).get("/users")
                .set("x-access-token", "qwertyuiopasdfghjklzxcvbnm1234567890.qwerty.asdf")
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });

    /*describe("/GET users/auth", () => {
        it("it should 404", (done) => {
            chai.request(server).get("/users/auth")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });*/

    describe("/POST users/auth", () => {
        it("it should 403, invalid credentials", (done) => {
            chai.request(server).post("/users/auth")
                .set("content-type", "application/x-www-form-urlencoded")
                .send({email: "AAAAAAAAA", password: "no"})
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("it should 403, no credentials", (done) => {
            chai.request(server).post("/users/auth")
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("it should 403, no email, only password", (done) => {
            chai.request(server).post("/users/auth")
                .set("content-type", "application/x-www-form-urlencoded")
                .send({password: "no"})
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("it should 403, no password, only email", (done) => {
            chai.request(server).post("/users/auth")
                .set("content-type", "application/x-www-form-urlencoded")
                .send({email: "AAAAAAAAA"})
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("it should 200, return token and user, valid creds", (done) => {
            chai.request(server).post("/users/auth")
                .set("content-type", "application/x-www-form-urlencoded")
                .send({email: username, password: password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("auth");
                    res.body.auth.should.have.property("user");
                    res.body.auth.user.should.have.property("id");
                    uid = res.body.auth.user.id;
                    res.body.should.have.property("token");
                    token = res.body.token;
                    done();
                });
        });
    });
});

/* eslint-enable */

