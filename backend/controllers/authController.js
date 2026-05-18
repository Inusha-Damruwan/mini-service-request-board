import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const setTokenCookie = (res, token) => {
  const secure = process.env.COOKIE_SECURE === 'true';
  res.cookie('token', token, {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

const toUserPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ success: false, message: 'Email already in use' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashed });
    const token = createToken(user);
    setTokenCookie(res, token);
    const userPayload = toUserPayload(user);

    res.status(201).json({
      success: true,
      token,
      user: userPayload,
      data: userPayload
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = createToken(user);
    setTokenCookie(res, token);
    const userPayload = toUserPayload(user);

    res.status(200).json({
      success: true,
      token,
      user: userPayload,
      data: userPayload
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  const secure = process.env.COOKIE_SECURE === 'true';
  res.clearCookie('token', {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax'
  });
  res.json({ success: true, message: 'Logged out' });
};

export const getProfile = (req, res) => {
  const user = req.user;
  const userPayload = toUserPayload(user);
  res.json({ success: true, user: userPayload, data: userPayload });
};

// Backward-compatible aliases
export const register = registerUser;
export const login = loginUser;
export const logout = logoutUser;
export const profile = getProfile;