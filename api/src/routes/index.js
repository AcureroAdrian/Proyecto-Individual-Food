const { Router } = require('express');
const recipeHost = require("./routeRecipe");
const dietHost = require("./routeDiet");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();
router.use("/recipes", recipeHost);
router.use("/diet", dietHost);

module.exports = router;
