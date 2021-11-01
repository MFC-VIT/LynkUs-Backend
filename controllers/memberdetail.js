const mongoose = require('mongoose') 
const Member = require('../models/member')
const Group = require('../models/group')
const User = require('../models/User')

const memberinfo = async(req,res)=>{
    let {uid, isadmin, gid,} = req.body
    try{
        const meminfo = new Member({uid ,isadmin ,gid})
        await meminfo.save()
        return res.status(201).send(meminfo)
    }
    catch(e)
    {
        return res.status(400).send('Problem !')
    }
}

const displayMember = async(req,res) =>{
    const gid = req.params.gid
    try
    {
        const data = await Member.find({gid})
        // console.log(data)
        try
        {
            console.log(data)
            const userId  = []
            data.forEach(element => userId.push(element.uid))
            const sendDetails = await User.find({ '_id' : { $in : userId}})
            res.status(200).send(sendDetails)
        }
        catch(e)
        {
            console.log(e)
        }

    }
    catch(e)
    {
        res.status(404).send(e)
    }
}

const specificMember = async(req,res) =>{
    const gid = req.query.group
    const uid = req.query.user
    try
    {
        const data = await Member.find({gid})
        // console.log(data)
        try
        {
            const sendDetails = await User.find({_id : uid})
            res.status(200).send(sendDetails)
        }
        catch(e)
        {
            console.log(e)
        }

    }
    catch(e)
    {
        res.status(404).send(e)
    }
}

module.exports = {memberinfo,displayMember,specificMember}