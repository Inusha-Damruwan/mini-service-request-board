import express from 'express';
import { getProfile, loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { validateLogin, validateRegister } from '../middleware/validateAuth.js';

const router = express.Router();

router.post('/register', validateRegister, validateRequest, registerUser);
router.post('/login', validateLogin, validateRequest, loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getProfile);

export default router;