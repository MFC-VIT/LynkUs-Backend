const router = require('express').Router()

const { addAttendance, showAttendance, showAttendanceAll ,updateAttendance} = require('../controllers/attendanceData')

router.get('/show', showAttendance)
router.get('/showall', showAttendanceAll)
router.post('/add', addAttendance)
router.patch('/update', updateAttendance)

module.exports = router