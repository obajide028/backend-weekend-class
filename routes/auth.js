const express = require('express');
const { register, login, updateDetails, deleteUser, getUser, getUsers, updatePassword } = require('../controller/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateDetails)
router.delete('/delete/:id', deleteUser)
router.get('/user/:id', getUser)
router.get('/users', getUsers)
router.put('/updatePassword/:id', updatePassword)



module.exports = router;