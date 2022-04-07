// api routes
const express = require("express")
const { db } = require("../model/User.js")
const User = require('../model/User.js') // new
const router = express.Router()



// post user to database
router.post("/user/register", async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: "Name is undefined" })
    }
    else if (!req.body.age) {
        return res.status(400).json({ error: "Age is undefined" })
    }
    let newID = undefined;
    try {
        newID = (await db.collection('counters').findOne()).seq + 1
    }
    catch (error) {
        if (!newID) newID == 1
    }
    const user = new User({
        userID: newID,
        name: req.body.name,
        age: req.body.age,
    })
    await user.save()
    try {
        res.send(user)
        console.log(`\n--------NEW USER CREATED--------`)
        console.log(`--------------------------------`)
        console.log(`Assigned userID : \t${newID}`)
        console.log(`Name : \t\t\t${req.body.name}`)
        console.log(`Age : \t\t\t${req.body.age}`)
        console.log(`--------------------------------`)
    } catch (error) {
        return res.status(409).send({ error: "Account already exists." })
    }
})


// Get all users
router.get("/users", async (_, res) => {
    const users = await User.find()
    res.send(users)
})


router.get('/user/lookup', async (req, res) => {
    res.sendFile(`${process.cwd()}/client/lookup_user.html`)
})


// get specific user
router.get("/user/lookup/:id", async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.id })
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})


// "update" to update a user
router.put("/user/lookup/:id", async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.id })
        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.age) {
            user.age = req.body.age
        }
        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

// delete
router.delete("/users/lookup/:id", async (req, res) => {
    try {
        await User.deleteOne({ userID: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
})

router.get('/user/create', (_, res) => {
    res.sendFile(`${process.cwd()}/client/create_user.html`)
})

router.get('/', (_, res) => {
    res.sendFile(`${process.cwd()}/client/lookup_user.html`)
})

router.get("/users/gettable", async (_, res) => {
    const users = User.find()
    console.log(users)
    res.send(users)
})

module.exports = router
