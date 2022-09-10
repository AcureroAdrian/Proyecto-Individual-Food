import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllDiets = createAsyncThunk("Diet/getAllDiets", async () => {
    return await axios.get("http://localhost:3001/diet")
})


export const dietSlice = createSlice({
    name: "Diet",
    initialState: {
        diets: undefined,
        status: ""
    },
    extraReducers: {
        [getAllDiets.pending]: (state) => {
            state.status = "Loading"
        },
        [getAllDiets.fulfilled]: (state, {payload}) => {
            state.diets = payload.data
            state.status = "Success"
        },
        [getAllDiets.rejected]: (state) => {
            state.diets = []
            state.status = "Failed"
        }
    }
})

export default dietSlice.reducer;