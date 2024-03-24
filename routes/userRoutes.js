const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = new express.Router();

// Registration
router.post('/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new Error('Unable to login');
    }

    const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret');
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
