const express = require('express')
const router = express.Router();
const habitcontroller = require('../controllers/habitcontroller')


router.post('/addhabits', habitcontroller.addhabit)
router.get('/toggle', habitcontroller.toggle)

router.get('/delete', habitcontroller.deletehabit)
module.exports = router;