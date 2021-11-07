const express = require('express');
const router = express.Router();

const { handleSignUp, updateUserByEmail } = require('../controllers/userController');

router.post('/api/user/sign-up', handleSignUp);
router.post('/api/user/update', updateUserByEmail);

module.exports = router;