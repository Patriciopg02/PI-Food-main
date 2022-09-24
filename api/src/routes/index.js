const { Router } = require('express');
const router = Router();
const RecipesMiddleware = require('./recipes')
const DietsMiddleware = require('./diets')


// Configurar los routers
router.use('/recipes', RecipesMiddleware);
router.use('/diets', DietsMiddleware);


module.exports = router;
