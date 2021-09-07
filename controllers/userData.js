const User = require('../models/User')

const addUser = (async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        password: req.body.password,
    })
    if(req.body.phone_no.length != 10)
        return res.status(411).send("Please enter a valid phone number")
    try {
        await user.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send("New User added")
})

const getUser = (async(req,res) => {
    const { email } = req.query

    const user = await User.findOne({email: email})

    if(!user || user.length === 0) 
        return res.status(404).send("User not found")

    return res.status(200).send(user)
})

const patchUser = (async(req,res) => {
    const { email } = req.query

    const user = await User.findOneAndUpdate({email: email},{
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        password: req.body.password},
        {new: true})

    if(req.body.phone_no.length != 10)
        return res.status(411).send("Please enter a valid phone number")

    try {
        await user.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send("User details updated")
})

module.exports = {addUser,getUser,patchUser}