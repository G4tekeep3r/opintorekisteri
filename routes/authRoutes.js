const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Reitit: /api/auth/register ja /api/auth/login
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;