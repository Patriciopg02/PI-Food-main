const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { Recipe , Diet, Recipe_Diet } = require('../db.js');
const {Op} = require('sequelize');
require('dotenv').config();
const {API_KEY} = process.env;

router.get('/', (req,res,next) => {
    let RecipesPromiseApi;
    let RecipesPromiseDB;
    let RecipesDietsPromise = Recipe_Diet.findAll();
    let DietsDBPromise = Diet.findAll();
    let query = false;
    const {name,offset} = req.query;
    if (name) {
        RecipesPromiseApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?offset=0&number=9&query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`);
        RecipesPromiseDB = Recipe.findAll({
            where: {name: {
                [Op.iLike]: '%' + name + '%'
            }},
            order: [
                ['name','ASC']
            ],
        });
        query = true;
    }
    else {
        RecipesPromiseApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=9&apiKey=${API_KEY}&addRecipeInformation=true`);
        RecipesPromiseDB = Recipe.findAll();
    }
    Promise.all([
        RecipesPromiseApi,
        RecipesPromiseDB,
        RecipesDietsPromise,
        DietsDBPromise
    ])
    .then((response) => {
        const [
        recipesApi, 
        recipesDB,
        recipesDietsDB,
        dietsDB
        ] = response;
    
    const filtered_apirecipes = recipesApi.data.results.map(recipe => {
        return {
            id: recipe.id,
            image: recipe.image,
            name: recipe.title,
            diets: recipe.diets,
            health_score: recipe.healthScore
        }
    })
    
    let filtered_dbrecipes;
    let allRecipes;
    if (query === true) {
        filtered_dbrecipes = recipesDB.map(recipe => {
            let diets_copy = recipesDietsDB.filter(rd => rd.recipeId === recipe.id);
            diets_copy = diets_copy.map(rd => {
                let diet = dietsDB.find(d => d.id === rd.dietId);
                if(diet !== null) return diet.name;
            })
            return {
                id: recipe.dataValues.id,
                image: recipe.dataValues.image,
                name: recipe.dataValues.name,
                diets: diets_copy,
                health_score: recipe.dataValues.health_score,
            }
        })
    } 
    else {
        filtered_dbrecipes = recipesDB.map(recipe => {
            let diets_copy = recipesDietsDB.filter(rd => rd.recipeId === recipe.id);
            diets_copy = diets_copy.map(rd => {
                let diet = dietsDB.find(d => d.id === rd.dietId);
                if(diet !== null) return diet.name;
            })
            return {
                id: recipe.id,
                image: recipe.image,
                name: recipe.name,
                diets: diets_copy,
                health_score: recipe.health_score,
            }
        })
    }
    allRecipes = [...filtered_dbrecipes, ...filtered_apirecipes] 
        
    if (allRecipes.length === 0) res.status(400).send('No se encontro la receta buscada.');
    while (allRecipes.length > 9) {
        allRecipes.pop();
    }

    if(offset == 0) {
        return res.status(200).json(allRecipes);
    }
    else {
        return res.status(200).json(filtered_apirecipes);
    }
    })
    .catch(err => next(err))
    }
)

router.post('/', async(req,res,next) => {
    try {
        let {name,summary,health_score,instructions,image} = req.body;
        if (!name || !summary) return res.send('receta no creada')
        let recipesDB = await Recipe.findAll();
        let finded = recipesDB.find(r => r.name === name);
        if(!finded) {
            let newRecipe = await Recipe.create({
                name,
                summary,
                health_score,
                instructions,
                image
            })
            
            return res.status(200).json(newRecipe);
        }
        else {
            return res.send('Esta receta ya existe!')
        }
    }
    catch(err) {
        next(err);
    }
})

router.post('/:recipeID/diet/:dietID', async(req,res,next) => {
    let {recipeID, dietID} = req.params;
    let recipe = await Recipe.findByPk(recipeID);
    let relaciones = await Recipe_Diet.findAll();
    await recipe.addDiet(dietID);
    return res.send(relaciones);
})


router.get('/:id', async(req,res,next) => {
    let {id} = req.params;
    try {
        if(typeof id === 'string' && id.length > 8) {
            //database
            let recipeDB = Recipe.findByPk(id);
            let RecipesDietsPromise = Recipe_Diet.findAll();
            let DietsDBPromise = Diet.findAll();

            Promise.all([
                recipeDB,
                RecipesDietsPromise,
                DietsDBPromise
            ])
            .then((response) => {
                const [
                    recipeDB,
                    RecipesDiets,
                    DietsDB
                ] = response

                let diets_copy = RecipesDiets.filter(rd => rd.recipeId === recipeDB.id);
                diets_copy = diets_copy.map(rd => {
                    let diet = DietsDB
                    .find(d => d.id === rd.dietId);
                    if(diet !== null) return diet.name;
                })

                let finishRecipe = {
                    id: recipeDB.id,
                    image: recipeDB.image,
                    name: recipeDB.name,
                    diets: diets_copy,
                    health_score: recipeDB.health_score,
                    summary: recipeDB.summary,
                    instructions: recipeDB.instructions,
                    
                }
                res.status(200).json(finishRecipe);
            })
            .catch(err => next(err))       
        }
        else {
            //api
            let response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            let recipe = {
                id: response.data.id,
                name: response.data.title,
                image: response.data.image,
                dish_types: response.data.dishTypes,
                diets: response.data.diets,
                summary: response.data.summary,
                health_score: response.data.healthScore,
                instructions: response.data.analyzedInstructions[0].steps.map(s => {
                    return {
                        number: s.number,
                        step: s.step
                    }
                })
            };
            res.status(200).json(recipe);
        }   
    }
    catch(err) {
        next(err);
    }
})
module.exports = router;