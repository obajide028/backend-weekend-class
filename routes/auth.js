const express = require('express');
const { register, login, updateDetails } = require('../controller/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateDetails)



module.exports = router;