const { createToken } = require("../utils/tokens");

exports.withAuth = (req) => req.set("Authorization", `${createToken(1, "test@test.com")}`);
