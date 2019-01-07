const { describe, it } = require("mocha");
const { expect } = require("chai");
const posts = require("../../functions-db/posts");

describe("Posts", () => {
    describe("getPost", () => {
        it("should return post", async () => {
            const post = await posts.getPost(1);
            expect(post).to.be.ok;
        });
    });
});