const router = require('express').Router()

const { addUser, getUser, patchUser } = require('../controllers/userData')

router.get('/details', getUser)
router.post('/add', addUser)
router.patch('/update', patchUser)

module.exports = router