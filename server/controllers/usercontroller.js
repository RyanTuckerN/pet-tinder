const express = require("express");
const { User } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// ALL OUR CONTROLLERS FOR USER GO HERE
router.post("/signup", function (req, res) {
  const { profile_name, name, password, email } = req.body
  User.create({
    profile_name,
    name,
    passwordhash: bcrypt.hashSync(password, 13),
    email,
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

router.post("/login", (req,res) => {
  const { profile_name, password } = req.body
  User.findOne({where: { profile_name: profile_name }})
    .then(user=>{
      if(user){
        bcrypt.compare(
          password, user.passwordhash, (err, match) => {
            if(match){
              const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
                expiresIn: 86400
              })
              res.status(200).json({ 
                user,
                message: `🙂 User ${user.profile_name} logged in!!🙂`, 
                sessionToken: token
              })
            } else {
              res.status(502).send({message: 'Incorrect Password', err})
            }
          }
        )
      } else {
        res.status(500).json({message: 'User does not exist 🤷 '})  
      }
    })
    .catch(err=>res.status(500).json({message: 'Something went wrong', err}))
})

module.exports = router;
