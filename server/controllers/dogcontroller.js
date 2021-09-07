const express = require('express')
const { Dog } = require('../models')
const router = express.Router()
const validateSession = require('../middleware/validateSession');
const Dog = require('../models/dog');

// ALL OUR CONTROLLERS FOR DOG GO HERE 

router.get("/:id",validateSession, (req, res) => {
    const query = {where:{id:req.params.id, owner_id: req.user.id} };
    Dog.findAll(query)
    .then((dog) => res.status(200).json(dog))
    .catch((err) => res.status(500).json({error:err}))
});

router.delete("/:id",validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner_id: req.user.id} };

    Dog.destroy(query)
    .then(()=> res.status(200).json({message: "Dog Entry Deleted"}))
    .catch((err) => res.status(500).json({error:err}));

});

router.put("/:id", validateSession, (req, res) => {
    const { photo_url, name, breed, weight, age, ad_description, temperament, is_female } = req.body
    const updateDog = {
        photo_url, name, breed, weight, age, ad_description, temperament, is_female,
        owner_id: req.user.id,
    };
    const query = {where: {id:req.params.id, owner_id:req.user.id}}

    Dog.update(updateDog, query)
    .then((dog) => {
        if (!dog[0]) {
          res.status(403).json({
            message: "This dog either doesn't exist or it isn't yours!",
          });
        } else {
          res.status(200).json({
            message: `Dog ${req.params.id} has been updated!`,
            updateCount: dog,
          });
        }
      })
    .catch((err)=>res.status(500).json({error:err}))
})


router.post('/', validateSession, (req, res) => {
    const { photo_url, name, breed, weight, age, ad_description, temperament, is_female } = req.body
    const dogEntry = {
        photo_url, name, breed, weight, age, ad_description, temperament, is_female,
        owner_id: req.user.id,
    }
    Dog.create(dogEntry)
        .then(dog => res.status(200).json(dog))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/all', validateSession, (req, res) => {
    Dog.findAll()
        .then(dogs => res.status(200).json({dogs}))
        .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;