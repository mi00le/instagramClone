const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const { withAuth } = require("../utils");

chai.use(chaiHttp);

const { expect, request } = chai;

describe("User Routes", () => {
    describe("GET /users", () => {
        it("should fail if not authenticated", async () => {
            const res = await request(server).get("/users");

            expect(res).to.have.status(403);
        });
        it("should return users", async () => {
            const res = await withAuth(request(server).get("/users"));

            expect(res).to.have.status(200);
        });
    });
});
