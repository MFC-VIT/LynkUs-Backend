const router = require('express').Router();

const { createMeet, getAllMeet, getMeet, updateMeet, deleteMeet } = require('../controllers/meetingData.js')

router.post('/create', createMeet);
router.get('/getall/:gid', getAllMeet);
router.get('/get/:mid', getMeet);
router.put('/update/:mid', updateMeet);
router.delete('/delete/:mid', deleteMeet);

module.exports = router;