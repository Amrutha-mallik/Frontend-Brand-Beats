import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/a"

export const uploadfile = createAsyncThunk(
    "Files/uploadfile",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/upload", formData, {headers:{Authorization:localStorage.getItem("token")}});
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFilesByProjectId = createAsyncThunk(
    "Files/fetchFilesByProjectId",async(projectId,{rejectWithValue})=>{
        try{
            const response = await axios.get(`/upload/${projectId}`, {headers:{Authorization:localStorage.getItem("token")}})
            console.log( "files", response.data)
            return response.data

        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)


export const deleteFileById = createAsyncThunk(
    "Files/deleteFilebyId", async(id, {rejectWithValue})=>{
        try{
            const response = await axios.delete(`/upload/${id}`, {headers:{Authorization:localStorage.getItem("token")}})
            console.log("id", response.data)
            return response.data

        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const approveFile = createAsyncThunk(
    "Files/approveFile", async({id, status, comment}, {rejectWithValue})=>{
        try{
            const response = await axios.put(`/upload/approve/${id}`,{status, comment}, {headers:{Authorization:localStorage.getItem("token")}})
            console.log(response.data)
            return response.data

        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)
const FileSlice = createSlice({
    name:"File",
    initialState:{
        data:[],
        isLoading:false,
        error:null
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(uploadfile.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(uploadfile.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.data.push(action.payload)
        })
        .addCase(uploadfile.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(fetchFilesByProjectId.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchFilesByProjectId.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.data= action.payload
        })
        .addCase(fetchFilesByProjectId.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(deleteFileById.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteFileById.fulfilled,(state, action)=>{
            console.log("DELETE PAYLOAD 👉", action.payload)
            state.isLoading = false;
            state.data = state.data.filter((file)=> file._id !== action.payload.deletedFile._id)
        })
        .addCase(deleteFileById.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(approveFile.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(approveFile.fulfilled,(state, action)=>{
            state.isLoading = false;
            const index = state.data.findIndex((file)=> file._id === action.payload._id)
            if(index !== -1){
                state.data[index] = action.payload
            }
        })
        .addCase(approveFile.rejected,(state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})

export default FileSlice.reducer;