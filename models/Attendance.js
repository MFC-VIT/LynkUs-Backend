const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    uid : {
        type : String,
        required : true
    },
    meetingId: {
        type: Number,
        required: true
    },
    gid: {
        type: String,
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