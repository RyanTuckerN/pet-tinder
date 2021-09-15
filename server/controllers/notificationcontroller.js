const express = require("express");
const router = express.Router();
const { Notification } = require("../models");
const validateSession = require("../middleware/validateSession");

//get all notifications
router.get("/", validateSession, async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(501).json({ error });
  }
});

//sends notification to target user
router.post("/:target_user_id", validateSession, (req, res) => {
  const { message, target } = req.body;
  Notification.create({
    message, target,
    userId: req.params.target_user_id,
  })
    .then((note) => {
      res.status(200).json({
        message: "sent notification",
        note,
      });
    })
    .catch((err) => res.status(409).json({ err }));
});

//deletes all current notifications belonging to user
router.delete("/", validateSession, async (req, res) => {
  try {
    const deletions = await Notification.destroy({
      where: { userId: req.user.id },
    });
    res.status(200).json({ deletions });
  } catch (err) {
    res.status(409).json({ err });
  }
});

module.exports = router;
