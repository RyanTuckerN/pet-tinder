const express = require('express')
const { Dog } = require('../models')
const router = express.Router()
// let validateSession = require('../middleware/validateSession');

// ALL OUR CONTROLLERS FOR DOG GO HERE 

// GET DOG BY ID
router.get("/:id", (req, res) => {
    const query = {where:{id:req.params.id, owner_id: req.user.id} };
    Dog.findAll(query)
    .then((dog) => res.status(200).json(dog))
    .catch((err) => res.status(500).json({error:err}))
});

// DELETE DOG BY ID
router.delete("/:id", (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id} };

    Dog.destroy(query)
    .then(()=> res.status(200).json({message: "Dog Entry Deleted"}))
    .catch((err) => res.status(500).json({error:err}));

});

//router.get?

//router.put?

//explain what each is doing

// CREATES A DOG PROFILE //
router.post('/', (req, res) => {
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
router.get('/all', (req, res) => {
    Dog.findAll()
        .then(dog => res.status(200).json(dog))
        .catch(err => res.status(500).json({ error: err }))
});


module.exports = router;