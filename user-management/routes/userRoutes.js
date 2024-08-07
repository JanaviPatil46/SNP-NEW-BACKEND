// const express = require("express");
// const router = express.Router();

// const { login, register, dashboard, getAllUsers } = require("../controllers/userController");
// const authMiddleware = require('../middleware/auth')

// router.route("/login").post(login);
// router.route("/register").post(register);
// router.route("/dashboard").get(authMiddleware, dashboard);
// router.route("/users").get(getAllUsers);


// module.exports = router;

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel');
// const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = new User({ username, email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

// Signup (Create user)
router.post('/signup', createUser);

// Login
router.post('/login', loginUser);

// Get all users
router.get('/', getUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
