import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit"
import axios from "../config/a"

export const fetchProjects = createAsyncThunk(
  "Producer/fetchProjects",
  async () => {
    try{
      const response = await axios.get("/projects", {
        headers: { Authorization: localStorage.getItem("token") }})
      console.log("a", response.data)
      return response.data
    }
    catch(err){
    console.log(err)
  }}
)

export const fetchOneProject = createAsyncThunk(
  "Producer/fetchOneProject", async( id ,{rejectWithValue})=>{
    try{
    const response = await axios.get(`/project/${id}`, {headers:{Authorization:localStorage.getItem("token")}})
    console.log("oneproject", response.data)
    return response.data
    }catch(err){
      console.log(err)
      return rejectWithValue(err.response.data.error)

    }
  }
)

export const fetchbrand = createAsyncThunk("Producer/fetchbrand", async(undefined,{rejectWithValue})=>{
  try{
    const response = await axios.get("/project/by-project", {headers:{Authorization:localStorage.getItem("token")}})
    console.log(response.data)
    return response.data
  }
  catch(err){
    console.log(err)
    return rejectWithValue(err.response.data.error)
  }
})

export const createProjects = createAsyncThunk("Producer/fetchproject", async(values, {rejectWithValue})=>{
  try{
    const response = await axios.post("/createProject", values,{headers:{Authorization:localStorage.getItem("token")}})
    console.log(response.data)
    return response.data

  }catch(err){
    console.log(err)
    return rejectWithValue(err.response.data.error)
  }
})

export const assignProducer = createAsyncThunk("Producer/assignProducer", async ( {projectId, proposalId}, {rejectWithValue})=>{
  try{
    const response = await axios.post(`/project/${projectId}/assign/${proposalId}`, {},{headers:{Authorization:localStorage.getItem("token")}})
    console.log(response.data)
    return response.data

  } catch(err){
    console.log(err)
    return rejectWithValue(err.response.data.error)
  }
})


const producerSlice = createSlice({
  name: "producer",
  initialState: {
    projects: [],
    isLoading: false,
    error: null,
    singleProject:null
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.projects = action.payload   // <-- SAVE DATA HERE
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchOneProject.fulfilled, (state, action)=>{
        state.isLoading = false
        state.singleProject = action.payload
      })
      .addCase(fetchOneProject.rejected, (state, action)=>{
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchbrand.fulfilled, (state, action)=>{
        state.isLoading = false
        state.projects = action.payload
      })
      .addCase(fetchbrand.rejected,(state, action) =>{
        state.isLoading = false
        state.error = action.payload
      })
        .addCase(createProjects.pending, (state) => {
        state.isLoading = true
      })
        .addCase(createProjects.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload) {
        state.projects.push(action.payload)
        }
      })
        .addCase(createProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(assignProducer.fulfilled, (state, action)=>{
        state.isLoading = false
          const updatedProject = action.payload.project
           const index = state.projects.findIndex(p => p._id === updatedProject._id)
            if (index !== -1) {
              state.projects[index] = updatedProject
            }

            if (state.singleProject && state.singleProject._id === updatedProject._id) {
              state.singleProject = updatedProject
            }
          })
      .addCase(assignProducer.rejected ,(state, action)=>{
        state.isLoading = false
        state.error = action.payload
      })
  }
})



export default producerSlice.reducer
