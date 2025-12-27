import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/a"
import {assignProducer } from "../slice/producer-slice"

export const fetchproposal = createAsyncThunk("Brand/fetchproposal", async (id, {rejectWithValue})=>{
    try{
        const  response = await axios.get(`projectsbyproposal/${id}`, {headers : {Authorization:localStorage.getItem("token")}} )
        console.log( "proposal", response.data)
        return response.data
    }catch(err){
        console.log(err)
    }
})

const BrandSlice = createSlice({
    name:"brands",
    initialState:{
        proposal:[],
        isLoading:false,
        errors:null
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchproposal.fulfilled,(state, action)=>{
            state.isLoading= false
            state.proposal = action.payload
        })
        .addCase(fetchproposal.rejected,(state,action )=>{
            state.isLoading= false
            state.errors = action.error.message
        })
        .addCase(assignProducer.fulfilled,(state, action)=>{
            state.isLoading = false

            if (action.payload?.proposals) {
          state.proposal = action.payload.proposals;
        }
        })
        .addCase(assignProducer.rejected, (state, action)=>{
            state.isLoading = false
            state.errors = action.payload
        })
    }
})

export default BrandSlice.reducer