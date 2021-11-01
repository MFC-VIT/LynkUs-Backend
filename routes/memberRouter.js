const router = require('express').Router()
const {memberinfo,displayMember,specificMember} = require('../controllers/memberdetail')

router.post('/add',memberinfo)
router.get('/display/:gid',displayMember)
router.get('/display',specificMember)

module.exports = router