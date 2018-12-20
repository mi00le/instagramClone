const { createToken } = require("../utils/tokens");

exports = {
    withAuth: (req) => {
        const token = createToken(1, "test@test.com");

        req.set("Authorization", `Bearer ${token}`);
    }
};
