const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    meetingId: {
        type: Number,
        required: true
    },
    attend: {
        type: Boolean,
        default: true
    },
    reason: {
        type: String,
        default: ""

    }
})

module.exports = mongoose.model('Attendance',attendanceSchema);