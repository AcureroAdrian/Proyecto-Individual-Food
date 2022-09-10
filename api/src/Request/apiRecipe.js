const axios = require("axios");
const { Recipe, Diet } = require("../db");
const typeDiets = require("./typeDiets");
const { API_KEY } = process.env;

const chargedRecipesByApi = async () => {
    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const apiInfo = recipeApi.data.results.map(e => {

        return {
            image: e.image,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary.replace(/<[^>]*>?/g, ''),
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes.length > 0 ? e.dishTypes : null,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return `Paso #${e.number}: ${e.step}`
            })
            //instructions: detail.instructions.replace(/<[^>]*>?/g, '')

        }
    })

    await Recipe.bulkCreate(apiInfo);
    await Diet.bulkCreate(typeDiets);

    await associations(apiInfo)


}

const associations = (apiInfo) => {

    apiInfo.forEach(async e => {
        const currentRecipe = await Recipe.findOne({
            where: {
                name: e.name
            }
        });

        e.dietTypes.forEach(async e => {
            let current = await Diet.findOne({
                where: {
                    name: e
                }
            })

            if (current !== null) {

                await currentRecipe.addDiet(current);

            }
        })
    })
}

module.exports = chargedRecipesByApi