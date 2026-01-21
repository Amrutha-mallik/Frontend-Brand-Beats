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

export const pendingbrands = createAsyncThunk("Admin/pendingbrands", async()=>{
    try{
        const response = await axios.get("pendingbrands",{headers:{Authorization:localStorage.getItem("token")}})
        console.log( "a",response.data)
        return response.data

    }catch(err){
        console.log(err)
    }
})

export const approvebrand = createAsyncThunk("Admin/approvebrand", async(id,{rejectWithValue})=>{
    try{
        const response = await axios.put(`approvebrand/${id}`,{},{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

export const rejectbrands = createAsyncThunk("Admin/rejectbrands", async(id,{rejectWithValue})=>{
    try{
        const response = await axios.delete(`rejectbrand/${id}`, {headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data

    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})
const adminSlice = createSlice({
    name: "admin",
    initialState:{
        producer:[],
        brand:[],
        pendingBrands: [],
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
        .addCase(pendingbrands.fulfilled,(state, action) =>{
            state.isLoading = false
            state.pendingBrands = action.payload
        })
        .addCase(pendingbrands.rejected,(state, action)=>{
            state.isLoading= false
            state.error= action.payload
        })
        .addCase(approvebrand.fulfilled, (state, action) => {
            const approvedBrand = action.payload.brand
            const index = state.pendingBrands.findIndex((b) => b._id === approvedBrand._id)
            if (index !== -1) {
                state.pendingBrands[index].isApproved = true}
            })
        .addCase(approvebrand.rejected,(state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        .addCase(rejectbrands.fulfilled,(state, action)=>{
            state.isLoading = false
            state.pendingBrands= state.pendingBrands.filter((b) =>b._id !== action.payload.brand._id)
        })
        .addCase(rejectbrands.rejected,(state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
    }


})

export default adminSlice.reducer