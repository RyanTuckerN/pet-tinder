const express = require("express");
const router = express.Router();
const { Like, Dog, User, Notification } = require("../models");
const { Op } = require("sequelize");
const validateSession = require("../middleware/validateSession");

router.post('/:target_user_id', (req,res)=>{
  const { message } = req.body
  Notification.create(
    {
      message, userId: req.params.target_user_id
    }
  )
  .then(note=>{
    res.status(200).json({
      message: 'sent notification',
      note
    })
  })
  .catch(err=>res.status(409).json({err}))
})

module.exports = router;
