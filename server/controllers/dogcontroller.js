const express = require('express');
const { Dog } = require('../models');
const router = express.Router();
// let validateSession = require('../middleware/validate-session');
// const Dog = require('../db').import('../models/dogcontroller');


// ALL OUR CONTROLLERS FOR DOG GO HERE 

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