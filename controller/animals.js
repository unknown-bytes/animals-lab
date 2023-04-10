const express = require('express');
const router = express.Router();
const animals = require('../models/animals.js');

// routes {
    // Post Routes
    router.post('/', async (req, res) => {
        console.log(req.body)
        req.body.extinct = req.body.extinct === 'on' ? true : false;
        res.redirect('/animals');
    })
    // Update
    router.put('/:id', async (req, res) =>  {
        const id = req.params.id;
        req.body.extinct = req.body.extinct === 'on' ? true : false;
        const Animals = await animals.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.redirect('/animals');
    })
    // New

    // Edit
    router.get('/:id/edit', async (req, res) => {
        const animal = await animals.findById(req.params.id);
        res.render("animals/edit.ejs", {animal});
    })
    // Show
    router.get('/', async (req,res) => {
        const Animals = await animals.find({});
        res.render(
            "animals/index.ejs",
            {
                animals:Animals
                
            });
    });
    // Show one animal
    router.get('/:id', async (req, res) => {
        const animal = await animals.findById(req.params.id);
        // res.send(animal);
        res.render("animals/show.ejs", {animal})
    });    
// }
module.exports = router;
