const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        min: Date.now(),
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isformal: {
        type: Boolean,
        required: true,
    },
    gid: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    adminId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Meeting', MeetingSchema);