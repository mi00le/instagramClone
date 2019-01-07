/**
 * Format post for client.
 * @constructor
 * @param {obj} post - The post object.
 */
exports.toClientStructure = post => ({
    id: post.ID,
    userId: post.AuthorID,
    username: post.AuthorName,
    url: post.Url,
    createdAt: post.CreatedAt,
    title: post.Title,
    description: post.Description,
    tags: post.Tags
});
