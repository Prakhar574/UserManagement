const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    
    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/users', async (req, res) => {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
      }
    });
    

    router.put('/users/:id', async (req, res) => {
      const { id } = req.params;
      const { username, email, password } = req.body;
    
      try {
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err });
      }
    });
    

    router.delete('/users/:id', async (req, res) => {
      const { id } = req.params;
    
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
      }
    });
    
module.exports = router;
