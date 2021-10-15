const Meeting = require('../models/Meeting');
const User = require('../models/User');
const Group = require('../models/group');
const Member = require('../models/member');

// Controller for creating a meeting
const createMeet = async (req, res) => {
    let { title, date, time, isformal, gid, link, adminId } = req.body;
    
    const user = await User.findById(adminId);

    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found' });

    const group = await Group.findById(gid);

    // Check if group exists
    if (!group) return res.status(404).json({ message: 'Group not found' });
    // Check if user is admin of group
    if (group.admin != adminId) return res.status(401).json({ message: 'You are not the admin of this group' });
    
    // Creating the date object
    date = new Date(date);
    date.setHours(time.split(':')[0]);
    date.setMinutes(time.split(':')[1]);
    date.setSeconds(time.split(":")[2]);
    
    // Check if date is in the past
    if (date < Date.now()) return res.status(400).json({ message: 'Date is in the past' });
    
    // Creating the meeting
    const meeting = new Meeting({ title, date, time, isformal, gid, link, adminId });
    
    try {
        // Saving the meeting
        await meeting.save();
    } catch (err) {
        // If there is an error, return it
        return res.status(500).json({ message: err.message });
    }

    // Sending response object
    return res.status(201).send(meeting);
}

// Controller for getting all meetings
const getAllMeet = async (req, res) => {
    const { gid } = req.params;
    const { uid } = req.query;

    const user = await User.findById(uid);
    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found' });

    const group = await Group.findById(gid);
    // Check if group exists
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const member = await Member.findOne({ gid, uid });
    // Check if user is part of the group
    if (!member) return res.status(401).json({ message: 'You are not a member of this group' });

    const meetings = await Meeting.find({ gid });
    // Check if meetings exist
    if (!meetings) return res.status(404).json({ message: 'No meetings found' });

    return res.status(200).send(meetings);
}

// Controller for getting a meeting
const getMeet = async (req, res) => {
    const { mid } = req.params;
    const { gid, uid } = req.query;

    const user = await User.findById(uid);
    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found' });

    const group = await Group.findById(gid);
    // Check if group exists
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const member = await Member.findOne({ gid, uid });
    // Check if user is part of the group
    if (!member) return res.status(401).json({ message: 'You are not a member of this group' });

    const meeting = await Meeting.findById(mid);
    // Check if meeting exists
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    return res.status(200).send(meeting);
}

// Controller for updating a meeting
const updateMeet = async (req, res) => {
    const { mid } = req.params;
    const { title, date, time, isformal, gid, link, adminId } = req.body;

    const user = await User.findById(adminId);
    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found' });

    const group = await Group.findById(gid);
    // Check if group exists
    if (!group) return res.status(404).json({ message: 'Group not found' });
    // Check if user is admin of group
    if (group.admin != adminId) return res.status(401).json({ message: 'You are not the admin of this group' });

    // Creating the date object
    date = new Date(date);
    date.setHours(time.split(':')[0]);
    date.setMinutes(time.split(':')[1]);
    date.setSeconds(time.split(":")[2]);

    // Check if date is in the past
    if (date < Date.now()) return res.status(400).json({ message: 'Date is in the past' });

    // Updating the meeting
    const meeting = await Meeting.findByIdAndUpdate(mid, { title, date, time, isformal, gid, link, adminId }, { new: true });
    // Check if meeting exists
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    return res.status(200).send(meeting);
}

// Controller for deleting a meeting
const deleteMeet = async (req, res) => {
    const { mid } = req.params;
    const { gid, uid } = req.query;

    const user = await User.findById(uid);
    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found' });

    const group = await Group.findById(gid);
    // Check if group exists
    if (!group) return res.status(404).json({ message: 'Group not found' });
    // Check if user is admin of group
    if (group.admin != uid) return res.status(401).json({ message: 'You are not the admin of this group' });

    const meeting = await Meeting.findById(mid);
    // Check if meeting exists
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    // Deleting the meeting
    await Meeting.findByIdAndDelete(mid);

    return res.status(200).send({ message: 'Meeting deleted' });
}

module.exports = { createMeet, getAllMeet, getMeet, updateMeet, deleteMeet };