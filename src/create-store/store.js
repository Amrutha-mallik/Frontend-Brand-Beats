import { configureStore } from "@reduxjs/toolkit";
import producerReducer from "../slice/producer-slice"
import adminReducer from "../slice/admin-slice"


const createStore=()=>{
    return configureStore({
        reducer: {
            Producer:producerReducer,
            Admin:adminReducer
        }
    })
}
export default createStore

 