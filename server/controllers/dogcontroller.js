const express = require('express')
const { Dog } = require('../models')
const router = express.Router()
const validateSession = require('../middleware/validateSession');

// ALL OUR CONTROLLERS FOR DOG GO HERE 

// GET DOG BY ID
router.get("/:id",validateSession, (req, res) => {
    const query = {where:{id:req.params.id, owner_id: req.user.id} };
    Dog.findAll(query)
    .then((dog) => res.status(200).json(dog))
    .catch((err) => res.status(500).json({error:err}))
});

// DELETE DOG BY ID
router.delete("/:id",validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner_id: req.user.id} };

    Dog.destroy(query)
    .then(()=> res.status(200).json({message: "Dog Entry Deleted"}))
    .catch((err) => res.status(500).json({error:err}));

});

//router.put?

//explain what each is doing

// CREATES A DOG PROFILE //
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

// GETS ALL DOGS FROM ALL USERS //
router.get('/all', validateSession, (req, res) => {
    Dog.findAll()
        .then(dogs => res.status(200).json({dogs}))
        .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;