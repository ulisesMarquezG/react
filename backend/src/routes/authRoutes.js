const router = require('express').Router();
const { login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// POST /api/auth/login
router.post(
    '/login',
    // valida que username y password vengan no vacíos
    body('username').notEmpty(),
    body('password').notEmpty(),
    login
  );
  
  // GET /api/auth/profile  (protegida)
  router.get('/profile', protect, getProfile);
  
  module.exports = router;