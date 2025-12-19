import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/a"

export const listbrand = createAsyncThunk("Admin/listbrand",async()=>{
    try{
        const response = await axios.get('brandlist', {headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data

    }catch(err){
        console.log(err)
    }
})

export const listproducer = createAsyncThunk("Admin/listproducer", async()=>{
    try{
        const response = await axios.get("producerlist", {headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data

    } catch(err){
        console.log(err)
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState:{
        producer:[],
        brand:[],
        isLoading:false,
        error:null
    },

    extraReducers: (builder)=>{
        builder
        .addCase(listbrand.fulfilled, (state, action)=>{
            state.isLoading = false
            state.brand = action.payload
        })
        .addCase(listbrand.rejected,(state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        .addCase(listproducer.fulfilled,(state, action)=>{
            state.isLoading = false
            state.producer = action.payload
        })
        .addCase(listproducer.rejected,(state, action) =>{
            state.isLoading = false
            state.error = action.payload
        })
    }


})

export default adminSlice.reducer