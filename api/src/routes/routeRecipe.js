const { Router } = require("express");
const { Recipe, Diet, Op } = require("../db");
const { recipeDetailById } = require("../Request/apiRecipe")
const route = Router();


route.get("/", async (req, res) => {

    let { name, orderName, orderDiet, orderScore } = req.query;

        //

        let where;
        if (name !== undefined) 
        name.length < 4 ?
        where = { name: { [Op.iLike]: `${name}%`} } : 
        where = { name: { [Op.iLike]: `%${name}%` }}
        else where = {}

        //

        const order = [];
        let counter = 0;
        if (orderName == "ASC" || orderName === "DESC") order[counter++] = ["name", `${orderName}`]
        if (orderScore === "ASC" || orderScore === "DESC") order[counter] = ["healthScore", `${orderScore}`]

        //

        let findRecipes

    try {
        if (orderDiet === "default") {

            findRecipes = await Recipe.findAll({
                attributes: ["id", "name", "healthScore", "image"],
                include: Diet,
                where,
                order
            })

        } else {

             const searchRecipe = await Recipe.findAll({
                attributes: ["id"],
                include: { model: Diet, where: { id: orderDiet }}
            }).then(response => response.map(e => e.id))

            findRecipes = await Recipe.findAll({
                attributes: ["id", "name", "healthScore", "image"],
                where: {
                    ...where,
                    id: searchRecipe
                },
                include: Diet,
                order
            })

        }

        //

        return findRecipes.length ?
            res.status(200).json(findRecipes) :
            res.status(404).send("Dont find the recipe")

    } catch (error) {
        return res.status(404).send("Ocurrio algun error en la base de datos")
    }

});

route.get("/getAll", async (req, res) => {

    try {

        res.status(200).json(await Recipe.findAll({
            include: [Diet],
            attributes: ["id", "name", "healthScore", "image"]
        }));

    } catch (error) {
        res.status(404).send("Error al obtener las recetas")
    }

})




route.get("/:id", async (req, res) => {

    const { id } = req.params;

    try {

        if (isNaN(id)) return res.status(404).send("Incorrect Value");

        res.status(200).json(await Recipe.findByPk(id, {include: [Diet]}) );


    } catch (error) {
        res.status(400).send("Ocurrio algun error en la base de datos")
    }




})

route.post("/", async (req, res) => {
    let { name, summary, healthScore, steps, image, typeDiet, dishTypes } = req.body;

    try {

        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image,
            dishTypes
        })

        if (Array.isArray(typeDiet)) {
            typeDiet = typeDiet.map(e => e.toLowerCase());

            for (let i = 0; i < typeDiet.length; i++) {
                
                 let diets = await Diet.findOrCreate({
                    where: {
                       name: typeDiet[i]
                    }
                });

                await newRecipe.addDiet(diets[0])
            }
        }

        res.status(200).json(newRecipe)

    } catch (error) {
        res.status(400).send("Hubo algun error en la base de datos")
    }

})

module.exports = route