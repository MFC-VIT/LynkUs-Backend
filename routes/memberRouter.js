const router = require('express').Router()
const {memberinfo,displayMember} = require('../controllers/memberdetail')

router.post('/member',memberinfo)
router.get('/display',displayMember)

module.exports = router