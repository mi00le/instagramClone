/**
 * @typedef jwtOptions
 * @type {object}
 * @property {number} tokenLifetime - Default lifetime for jwt tokens
 * @property {string} secret - String secret to use with jwt tokens
 */

const jwt = require("jsonwebtoken");

/**
 * Object holding jwt-specific values
 * @type {jwtOptions}
 */
const options = {
    tokenLifetime: 3600, // 1 hour, in seconds
    secret: process.env.secret || "N2ZiN2EyNTEyNzkwNzBjYThiMzg5N2RjMDljODRkMmUyMjViMDA0ZjA3ZGVjMDhhNTZlNTkyZDU1YWVmNDYwYTY4ZTcxMTZkN2NkMTc2NTg4MWM2YzlhNjhjYTc0N2Y3NTQzZTVmY2EwMzcxODg4M2ZlNDQwMzhlYzEyNjM1OWU="
};

exports.options = options;
exports.jwt = jwt;

/**
 * Create a JWT token
 * @param {string|number} uid - User ID to include in token
 * @param {string} email - User email
 * @returns {string} JWT signed token
 */
exports.createToken = (uid, email) => {
    const token = jwt.sign({
        userId: uid,
        email: email
    }, options.secret, {
        expiresIn: options.tokenLifetime,
        algorithm: "HS512"
    });
    
    return token;
};
