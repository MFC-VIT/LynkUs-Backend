const router = require('express').Router();

const { createMeet } = require('../controllers/meetingData.js')

router.post('/create', createMeet);

module.exports = router;