const router = require('express').Router()
const {memberinfo,displayMember} = require('../controllers/memberdetail')

router.post('/create',memberinfo)
router.get('/display/:gid',displayMember)

module.exports = router