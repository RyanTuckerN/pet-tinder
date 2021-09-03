const express = require("express");
const User = require("../models/user");
const router = express.Router();
// const User = require('../db').import('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// ALL OUR CONTROLLERS FOR USER GO HERE
router.post("/signup", function (req, res) {
    const { profile_name, name, password, email, location, } = req.body
  User.create({
    profile_name,
    name,
    passwordhash: bcrypt.hashSync(password, 13),
    email,
    location,
  })
    .then(function signupSuccess(user) {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 86400})
      res.status(200).json({ user,
                message: `Success! Profile for ${profile_name} created!`,
                sessionToken: token
    });
    })
    .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;
