const Attendance = require('../models/Attendance')
const User = require('../models/User')
const Member = require ('../models/member')

const showAttendance = (async(req,res) => {
    const {uid, gid} = req.query

    const user = await User.find({_id: uid})

    if(!user || user.length === 0)
        return res.status(404).send("User does not exist")
    
    const member = await Member.find({uid: uid, gid: gid})

    if(!member || member.length === 0)
        return res.status(404).send("User is not part of the group")

    const attendance = await Attendance.find({uid: uid, gid: gid})

    if(!attendance || attendance.length === 0) 
        return res.status(404).send("Attendance record does not exist")

    return res.status(200).send(attendance)
})

const showAttendanceAll = (async(req,res) => {
    const {meetingId, gid} = req.query

    const group = await Member.find({gid: gid})

    if(!group || group.length === 0)
        return res.status(404).send("Group does not exist")

    const attendance = await Attendance.find({meetingId: meetingId, gid: gid})

    if(!attendance || attendance.length === 0) 
        return res.status(404).send("Attendance record does not exist")

    return res.status(200).send(attendance)

})

const updateAttendance = (async(req,res) => {
    const {uid , gid,  meetingId} = req.query

    const {attend, reason} = req.body
    
    if(!attend && !reason)
    return res.status(411).send("Please enter a reason")
    
    const user = await User.find({_id: uid})

    if(!user || user.length === 0)
        return res.status(404).send("User does not exist")
    
    const member = await Member.find({uid: uid, gid: gid})

    if(!member || member.length === 0)
        return res.status(404).send("User is not part of the group")
    
    const attendance = await Attendance.findOneAndUpdate({uid: uid, meetingId: meetingId, gid: gid},{
        uid,
        meetingId,
        gid,
        attend,
        reason 
    },
    {new: true})  
    
    try {
        await attendance.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send("Attendance updated")

})

const addAttendance = (async(req,res) => {
    const {uid, meetingId, gid, attend, reason} = req.body
    
    if(!attend && !reason)
    return res.status(411).send("Please enter a reason")
    
    try {
    const user = await User.find({_id: uid})

    if(!user || user.length === 0)
        return res.status(404).send("User does not exist")
    
    const member = await Member.find({uid: uid, gid: gid})

    if(!member || member.length === 0)
        return res.status(404).send("User is not part of the group")

    const attendance = new Attendance({
        uid, 
        meetingId,
        gid, 
        attend, 
        reason 
    })    
    
        await attendance.save();
        return res.status(201).send(attendance)    
    } catch (err) {
        return res.status(500).send(err)
    }

})

module.exports = {showAttendance, showAttendanceAll, updateAttendance, addAttendance}
