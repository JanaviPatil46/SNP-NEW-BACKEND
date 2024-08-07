// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       msg: "Bad request. Please add email and password in the request body",
//     });
//   }

//   let foundUser = await User.findOne({ email: req.body.email });
//   if (foundUser) {
//     const isMatch = await foundUser.comparePassword(password);

//     if (isMatch) {
//       const token = jwt.sign(
//         { id: foundUser._id, name: foundUser.name },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "30d",
//         }
//       );

//       return res.status(200).json({ msg: "user logged in", token });
//     } else {
//       return res.status(400).json({ msg: "Bad password" });
//     }
//   } else {
//     return res.status(400).json({ msg: "Bad credentails" });
//   }
// };

// const dashboard = async (req, res) => {
//   const luckyNumber = Math.floor(Math.random() * 100);

//   res.status(200).json({
//     msg: `Hello, ${req.user.name}`,
//     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//   });
// };

// const getAllUsers = async (req, res) => {
//   let users = await User.find({});

//   return res.status(200).json({ users });
// };

// const register = async (req, res) => {
//   let foundUser = await User.findOne({ email: req.body.email });
//   if (foundUser === null) {
//     let { username, email, password } = req.body;
//     if (username.length && email.length && password.length) {
//       const person = new User({
//         name: username,
//         email: email,
//         password: password,
//       });
//       await person.save();
//       return res.status(201).json({ person });
//     }else{
//         return res.status(400).json({msg: "Please add all values in the request body"});
//     }
//   } else {
//     return res.status(400).json({ msg: "Email already in use" });
//   }
// };

// module.exports = {
//   login,
//   register,
//   dashboard,
//   getAllUsers,
// };

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a new user (Signup)
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
