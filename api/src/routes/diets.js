const { Router } = require('express');
const router = Router();
const { Diet } = require('../db.js');

router.get('/', async(req,res,next) => {
    try {
        const diets = ["vegetarian",
        "vegan",
        "gluten free",
        "dairy free",
        "ketogenic",
        "lacto ovo vegetarian",
        "pescatarian",
        "paleolithic",
        "primal",
        "fodmap",
        "whole 30"
        ];

        let dietsDB = await Diet.findAll();
        if(dietsDB.length === 0) {
            for (let i = 0; i < diets.length; i++) {
                await Diet.create({
                    name: diets[i]
                })
            }
        }
        dietsDB = await Diet.findAll();
        return res.status(201).json(dietsDB);
    }
    catch(err) {
        next(err)
    }
})

module.exports = router;