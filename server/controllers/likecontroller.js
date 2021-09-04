const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");
const { Like } = require("../models");

/*IN ORDER FOR THIS TO WORK, NEED TO SET UP A useEffect ON CLIENT LOGIN THAT FETCHES
ALL MATCHES AND CORRESPONDING ID's. IF ID EXISTS, PUT, OTHERWISE POST */

//LIKE A DOG
router.post("/:liked_id", validateSession, (req, res) => {
  const { superlike } = req.body;
  Like.findOne({
    where: { liked_dog_id: req.params.liked_id, owner_id: req.user.id },
  })
    .then((like) => {
      if (like) {
        res.status(400).json({ message: "You already like this dog!" });
      } else {
        Like.create({
          liked_dog_id: req.params.liked_id,
          superlike, //default false
          owner_id: req.user.id,
        }).then((like) => {
          res.status(200).json({
            message: `💟 Added dog ${req.params.liked_id} to likes 💟`,
            like,
          });
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "Ruh-roh, something went wrong!", err });
    });
});

//UNLIKE A DOG
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

//GET ALL LIKES
router.get("/mine", validateSession, (req, res) => {
  Like.findAndCountAll({ where: { owner_id: req.user.id } }).then((data) => {
    const { count, rows } = data;
    if (!count) {
      res.status(200).json({ message: "You haven't yet liked any dogs!" });
    } else {
      res.status(200).json({ count, liked_dogs: rows });
    }
  });
});

//GET ALL MATCHES : Returns array of ids
router.get("/matches", validateSession, (req, res) => {
  Like.findAll({ where: { liked_dog_id: req.user.id } }).then((data) => {
    const dogsThatLikeYou = data;
    Like.findAll({ where: { owner_id: req.user.id } }).then((data) => {
      const dogsYouLike = data;
      const removeNonMatches = (youLike, likeYou) => {
        const arrayDiff = (a, b) => a.filter((n) => b.includes(n));
        return arrayDiff(
          youLike.map((d) => d.liked_dog_id),
          likeYou.map((d) => d.owner_id)
        );
      };
      res.status(200).json(removeNonMatches(dogsYouLike, dogsThatLikeYou));
    });
  }).catch(err=>{
    res.status(501).json({err})
  })
  
});
module.exports = router;
