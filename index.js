const express = require('express')
const mongoose = require('mongoose')
const open = require('open')
const PORT = process.env.PORT || 3000
const routes = require('./routes/routes.js')
const pages = require('./routes/pages')

require('dotenv').config()

mongoose.connect(
    String(process.env.DB_CONNECT), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        const app = express()
        app.use(express.json()) // middleware
        app.use(express.static('client'))
        app.use('/style', express.static('/client/style')) // quick access to CSS
        app.use('/script', express.static('/client/script')) // quick access to backend JS
        app.use('/', pages) // non api pages
        app.use("/api", routes)  // api routes
        app.listen(PORT, () => {
            console.log(`Server has started. Listening on port ${PORT}!`)
            open(`http://localhost:${PORT}/`) // opens browser on starting NodeJS app.
        })
    })
