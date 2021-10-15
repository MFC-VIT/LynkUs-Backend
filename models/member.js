const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    uid : {
        required : true,
        type : String
    },
    isadmin: {
        type: Boolean,
        default: false
        
    },
    gid : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Member', MemberSchema)

// 3. Member - Foreign Key of groups table, user Id, is_admin