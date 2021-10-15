const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    dp: {
        data: Buffer,
        type: String,
    },
    date: {
        type: String
    },
    admin: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Groups', GroupSchema)

/*
Groups - Title, Dp of the group, DateTimeField, Person who created the group.
*/