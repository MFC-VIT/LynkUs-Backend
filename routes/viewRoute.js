const router = require('express').Router()

const { displayPaths } = require('../controllers/viewPath')

router.get('/',displayPaths)

module.exports = router