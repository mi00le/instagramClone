/**
 * Format user for client
 * @constructor
 * @param {obj} user - The user object
 */
exports.toClientStructure = user => ({
    email: user.Email,
    displayName: user.displayName,
    id: user.ID
});
