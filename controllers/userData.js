const User = require('../models/User')

const addUser = (async (req, res) => {
    const { name, email, phone_no, password } = req.body

    if (phone_no.length != 10) return res.status(411).send("Please enter a valid phone number")

    const user = new User({ name, email, phone_no, password })

    try {
        await user.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send(user)
})

const getUser = (async (req, res) => {
    const { email } = req.query

    const user = await User.findOne({ email })
    if (!user) return res.status(404).send("User not found")

    return res.status(200).send(user)
})

const patchUser = (async (req, res) => {
    const { email } = req.query
    const { name, phone_no, password } = req.body

    if (phone_no.length != 10) return res.status(411).send("Please enter a valid phone number")

    const user = await User.findOneAndUpdate({ email }, {
        name,
        email: req.body.email,
        phone_no,
        password
    }, { new: true })

    try {
        await user.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send(user)
})

module.exports = { addUser, getUser, patchUser }