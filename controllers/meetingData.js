const Meeting = require('../models/Meeting');
const User = require('../models/User');

const createMeet = async (req, res) => {
    const { title, date, time, isformal, gid, link, adminId } = req.body;

    // Validation

    const meeting = new Meeting({ title, date, time, isformal, gid, link, adminId });

    try {
        await meeting.save();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    return res.status(201).send(meeting);
}

module.exports = { createMeet };