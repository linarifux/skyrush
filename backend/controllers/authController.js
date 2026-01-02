import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { 
    firstName, lastName, email, phone, password, 
    country, shippingOption, companyName, 
    street, streetLine2, city, state, zipCode, addressCountry 
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    country,
    shippingOption,
    companyName,
    address: {
      street,
      streetLine2,
      city,
      state,
      zipCode,
      country: addressCountry
    }
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    
    // UPDATED: Return all necessary fields for the UI
    res.status(200).json({
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      country: user.country,
      companyName: user.companyName,
      shippingOption: user.shippingOption,
      address: user.address, // <--- Critical for the "My Address" page
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Helper to generate JWT
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Changed from 'strict' for better local dev compatibility
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export { registerUser, loginUser, logoutUser };