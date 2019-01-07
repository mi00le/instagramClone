#Documentation

## Get all users
/users?limit=:limit GET
(optional) limit=[number]

## Create new user
/users POST
{
    email: [alphanumeric],
    password: [string],
    displayName: [alphanumeric]
}

## Verify user
/users/auth POST
{
    email: [alphanumeric],
    password: [string]
}

## Get user
/users/:userId GET

## Delete user and their posts
/users/:userId DELETE

## Get all posts
/posts?limit=:limit GET
(optional) limit=[number]

## Get all posts from a user
/posts/:userId?limit=:limit GET
(optional) limit=[number]

## Create post for user
/posts/:userId POST
{
    image: [blob],
    title: [string] (optional),
    description: [string] (optional),
    tags: [string] (optional),
    userName: [alphanumeric],
    userId: [string]
}

## Get post
/posts/:userId/:postId GET

## Update post
/posts/:userId/:postId POST
{
    title: [string] (optional),
    description: [string] (optional),
    tags: [string] (optional)
}

## Delete post
/posts/:userId/:postId DELETE
