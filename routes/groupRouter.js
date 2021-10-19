const router = require('express').Router()
const {createGroup,displayGroup,getGroup,getUserGroup,adminExist,getUsers} = require('../controllers/groupdetail')

router.post('/create',createGroup)
router.get('/display',displayGroup)
router.get('/display/:_id',getGroup)
router.get('/display/user/:_id',getUserGroup)
router.get('/valid',adminExist)
router.get('/user/:gid', getUsers)

module.exports = router