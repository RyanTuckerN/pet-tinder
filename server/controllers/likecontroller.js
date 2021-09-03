const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");
const { Like } = require("../models");

/*IN ORDER FOR THIS TO WORK, NEED TO SET UP A useEffect ON CLIENT LOGIN THAT FETCHES
ALL MATCHES AND CORRESPONDING ID's. IF ID EXISTS, PUT, OTHERWISE POST */
router.post("/:liked_id", validateSession, (req, res) => {
  const { superlike } = req.body;
  Like.create({
    liked_dog_id: req.params.liked_id,
    superlike, //default false
    owner_id: req.user.id,
  })
    .then((like) => {
      res.status(200).json({
        message: `💟 Added dog ${req.params.liked_id} to likes 💟`,
        like,
      });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "You already like this dog!" });
      } else {
        res
          .status(400)
          .json({ message: "Ruh-roh, something went wrong!", err });
      }
    });
});

router.delete("/:liked_id", validateSession, (req, res) => {
  Like.destroy({
    where: { liked_dog_id: req.params.liked_id, owner_id: req.user.id },
  }).then((like) => {
    res.status(200).json(
      like > 0
        ? {
            message: `💔 You have removed Dog ${req.params.liked_id} from your list of likes. 💔`,
            deleteCount: like,
          }
        : { message: "No matches to delete!" }
    );
  });
});

module.exports = router;
