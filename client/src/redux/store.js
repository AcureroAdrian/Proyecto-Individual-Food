import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";
import dietSlice from "./dietSlice";

const store = configureStore({
    reducer: {
        recipes: recipeReducer,
        diets: dietSlice
    }
})

export default store

