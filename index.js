const express = require('express')
const mongoose = require('mongoose')
const open = require('open')
const PORT = 3000
const routes = require('./routes/routes.js')

mongoose.connect(
    'mongodb+srv://samroot:sampass@sam-db.spny2.mongodb.net/DA219A-Lab1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        const app = express()
        app.use(express.json()) // middleware
        app.use("/api", routes)
        app.listen(PORT, () => {
            console.log(`Server has started. Listening on port ${PORT}!`)
            open(`http://localhost:${PORT}/`)
        })
        app.get('/', (_, res) => {
            res.send(`<section style="font-family: sans-serif; text-align: center; margin-top: 25%;"><h1> HOMEPAGE </h1><p>Navigate to /api/posts to continue`)
        })
    })

