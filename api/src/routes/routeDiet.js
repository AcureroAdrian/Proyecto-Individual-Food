const { Router } = require("express");
const { Diet } = require("../db");
const typeDiets = require("../Request/typeDiets");
const route = Router();

route.get("/", async (req, res) => {
    
    try { 

        const dietTypes = await Diet.findAll();
        res.status(200).json(dietTypes)

    } catch (error) {
        res.status(402).json(error)
    }
})

module.exports = route