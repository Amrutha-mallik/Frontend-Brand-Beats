import { configureStore } from "@reduxjs/toolkit";
import producerReducer from "../slice/producer-slice"
import adminReducer from "../slice/admin-slice"
import brandReducer from "../slice/brand-slice"
import fileReducer from "../slice/file-slice"


const createStore=()=>{
    return configureStore({
        reducer: {
            Producer:producerReducer,
            Admin:adminReducer,
            Brand:brandReducer,
            Files:fileReducer,
        }
    })
}
export default createStore

 