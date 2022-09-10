import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
export const getAllRecipes = createAsyncThunk("Recipes/getAllRecipes", async () => 
    await axios.get("http://localhost:3001/recipes/getAll")
);
//
export const findRecipes = createAsyncThunk("Recipes/findRecipes", async ({name, orderName, orderDiet, orderScore}) => 
    await axios.get(`http://localhost:3001/recipes?name=${name}&orderName=${orderName}&orderDiet=${orderDiet}&orderScore=${orderScore}`)
);
//
export const getRecipeId = createAsyncThunk("Recipes/getRecipeId", async (id) => {
    return await axios.get(`http://localhost:3001/recipes/${id}`)
})
//
export const postRecipe = createAsyncThunk("Recipes/postRecipe", async (body) => 
    await axios.post(`http://localhost:3001/recipes`, body)
)


//

const recipeSlice = createSlice({
    name: "Recipes",
    initialState: {
        allRecipes: [],
        findRecipes: [],
        recipePage: [],
        recipeById: undefined,
        statusgetAll: "",
        statusFind: "" ,
        statusGetId: "",
        statusPost: "",
        idPost: "",
        input: ""
    },
    reducers: {
        paginated: (state, {payload}) => {
            if (state.findRecipes.length > 0) state.recipePage = state.findRecipes.slice(payload, payload + 9)
            else state.recipePage = state.allRecipes.slice(payload, payload + 9)
        },
        reset: state => {
            if(typeof state.idPost === "number") state.idPost = ""
        }
    },
    extraReducers: {

        [getAllRecipes.pending]: state => {
           state.statusGetAll = "Loading";
        },
        [getAllRecipes.fulfilled]: (state, {payload}) => {
            state.allRecipes = payload.data;
            state.statusGetAll = "Success";
        },
        [getAllRecipes.rejected]: state => {
            state.statusGetAll = "Failed";
        },
        //
        [findRecipes.pending]: state => {
            state.statusFind = "Loading";
         },
         [findRecipes.fulfilled]: (state, {payload, meta}) => {
             state.findRecipes = payload.data;
             state.input = meta.arg.name;
             state.statusFind = "Success";
         },
         [findRecipes.rejected]: (state, {meta}) => {
             state.findRecipes = [];
             state.input = meta.arg.name;
             state.statusFind = "Failed";
         },
         //
         [getRecipeId.pending]: state => {
            state.statusGetId = "Loading";
         },
         [getRecipeId.fulfilled]: (state, {payload}) => {
            state.statusGetId = "Success";
            state.recipeById = payload.data;
         },
         [getRecipeId.rejected]: state => {
            state.statusGetId = "Failed";
         },
         //
         [postRecipe.pending]: state => {
            state.statusPost = "Loading";
         },
         [postRecipe.fulfilled]: (state, {payload}) => {
            state.statusPost = "Success";
            state.idPost = payload.data.id;
         },
         [postRecipe.rejected]: state => {
            state.statusPost = "Failed";
         },

    }
})

export const { paginated, reset } = recipeSlice.actions; 
export default recipeSlice.reducer;
