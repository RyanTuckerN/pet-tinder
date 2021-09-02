const express = require('express')
const {Dog} = require('../models')
const router = express.Router()
// const Dog = require('../db').import('../models/dogcontroller');

// ALL OUR CONTROLLERS FOR DOG GO HERE 


router.get("/:id", (req, res) => {

    const query = {where:{id:req.params.id, owner_id: req.user.id} };
    Dog.findAll(query)
    .then((dog) => res.status(200).json(dog))
    .catch((err) => res.status(500).json({error:err}))
});

router.delete("/delete/:id", (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id} };

    Dog.destroy(query)
    .then(()=> res.status(200).json({message: "Dog Entry Deleted"}))
    .catch((err) => res.status(500).json({error:err}));

});

//router.get?

//router.put?

//explain what each is doing


module.exports = router;