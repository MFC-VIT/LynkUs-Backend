const Attendance = require('../models/Attendance')

const showAttendance = (async(req,res) => {
    const {email , meetingId} = req.query

    const attendance = await Attendance.findOne({email: email, meetingId: meetingId})

    if(!attendance || attendance.length === 0) 
        return res.status(404).send("Attendance record does not exist")

    return res.status(200).send(attendance)
})

const showAttendanceAll = (async(req,res) => {
    const {meetingId} = req.query

    const attendance = await Attendance.find({meetingId: meetingId})

    if(!attendance || attendance.length === 0) 
        return res.status(404).send("Attendance record does not exist")

    return res.status(200).send(attendance)

})

const updateAttendance = (async(req,res) => {
    const {email , meetingId} = req.query

    const {Email, MeetingId, attend, reason} = req.body
    
    
    const attendance = await Attendance.findOneAndUpdate({email: email, meetingId: meetingId},{
        Email,
        MeetingId,
        attend,
        reason 
    },
    {new: true})  
    
    if(!attend && !reason)
        return res.status(411).send("Please enter a reason")

    try {
        await attendance.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send("Attendance updated")

})

const addAttendance = (async(req,res) => {
    const {email, meetingId, attend, reason} = req.body
    
    if(!attend && !reason)
        return res.status(411).send("Please enter a reason")

    const attendance = new Attendance({
        email, 
        meetingId, 
        attend, 
        reason 
    })    
    try {
        await attendance.save();
    } catch (err) {
        return res.status(500).send(err)
    }

    return res.status(201).send(attendance)    
})

module.exports = { showAttendance, showAttendanceAll, updateAttendance, addAttendance }