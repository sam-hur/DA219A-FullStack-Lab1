const express = require("express")
const Post = require('../model/User.js') // new
const router = express.Router()


// post
router.post("/posts", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    })
    await post.save()
    res.send(post)
})


// Get all posts
router.get("/posts", async (_, res) => {
    const posts = await Post.find()
    res.send(posts)
})

// get specific post
router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})

// "patch" to update a post
router.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (req.body.title) {
            post.title = req.body.title
        }
        if (req.body.content) {
            post.content = req.body.content
        }
        await post.save()
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})

// delete
router.delete("/posts/:id", async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
})

module.exports = router