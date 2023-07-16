const express = require('express')
const router = express.Router();
const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const successResponse = ({ message, data }) => ({ success: true, data: data ? data : null, message });
const failResponse = ({ message, data }) => ({ success: false, data: data ? data : null, message });

router.get('/', (req, res) => {
  res.send('server is running')
})
const signToken = (user) => {
  console.log(user)
  return jwt.sign(
    {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    }
  );
};
router.post('/register', async (req, res) => {
  const user = await userModel.find({ email: req.body.email });
  if (user.length < 1) {
    try {
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
      });

      const user = await newUser.save();
      const token = signToken(user);
      res.send({
        token,
        _id: user._id,
        userName: user.userName,
        email: user.email,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  } else {
    res.status(500).send(
      "Failed"
    );
  }
})

router.post('/login', async (req, res) => {
  const user = await userModel.findOne({ "email": req.body.email });
  if (user) {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      res.send({
        token,
        _id: user._id,
        userName: user.userName,
        email: user.email,
      });
    } else {
      res.status(401).send({
        message: "Invalid Password",
      }); 
    }
  } else {
    res.status(401).send({
      message: "Invalid Email",
    });
  }
})

module.exports = router
