const router = require('express').Router()
const {createGroup,displayGroup,getGroup,getUserGroup,adminExist} = require('../controllers/groupdetail')

router.post('/create',createGroup)
router.get('/display',displayGroup)
router.get('/display/group/:gid',getGroup)
router.get('/display/user/:uid',getUserGroup)
router.get('/valid',adminExist)

module.exports = router