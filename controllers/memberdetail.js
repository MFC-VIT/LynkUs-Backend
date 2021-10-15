const mongoose = require('mongoose') 
const Member = require('../models/member')
const Group = require('../models/group')

const memberinfo = async(req,res)=>{
    const { uid, isadmin, gid,} = req.body
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
        try
        {
            const data = await Member.find({})
            res.status(200).send(data)
        }
        catch(e)
        {
            res.status(404).send(e)
        }
}


module.exports = {memberinfo,displayMember}