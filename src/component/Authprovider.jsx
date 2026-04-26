import UserContext from "../context/userContext"
import { useReducer, useEffect } from "react"
import axios from "../config/a"
import {  useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Authprovider(props){
    const navigate = useNavigate()

    const usereducer=(state, action)=>{
        switch(action.type){
            case "LOG_IN":{
                return {...state,  isLogged:true, user:action.payload, serverError:""}
            }
            case "LOG_OUT":{
                return {...state, isLogged:false, user:null, serverError:""}
            }
            case "SERVER_ERROR":{
                return {...state, serverError:action.payload}
            }
            case "UPDATE_USER" :{
                return {...state, user:action.payload}
            }
            default:{
                return {...state}
            }
        }
    }

    const[userState, userDispatch]=useReducer(usereducer, {
        user:null,
        isLogged:false,
        serverError:""
    });

        useEffect(() => {
        const token = localStorage.getItem('token');
        userDispatch({ type: "SERVER_ERROR", payload: "" })
        if(token){
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/users/account',
                      {headers:{Authorization:token}}
                    );
                    userDispatch({type:"LOG_IN", payload:response.data});
                } catch(err){
                    console.log(err);
                }
            };
            fetchUser();
        }
    }, []);



    const handleregister = async(formdata)=>{
            try{
                const response = await axios.post("/users/register", formdata)
                console.log(response.data)
                 Swal.fire({
                    icon: "success",
                    title: "Registered Successfully",
                    text: "Please login to continue",
                })
                userDispatch({type:"SERVER_ERROR", payload:""})
                navigate("/login")
    
            }catch(err){
                console.log( "register", err.response.data)
                userDispatch({type:"SERVER_ERROR", payload:err.response.data?.error})
            }
        }

     const handlelogin = async(values)=>{
        try{
            const response = await axios.post("/users/login", values)
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            
            const userResponse = await axios.get('/users/account', {headers:{Authorization:response.data.token}})
            const role = userResponse.data.role;
            Swal.fire({
            icon: "success",
            title: "Login Successful",
            timer: 1000,
            showConfirmButton: false
        })
            userDispatch({type:"LOG_IN", payload:userResponse.data})

            if(role == "admin"){
                navigate("/admin/dashboard")
            } else if(role =="brand"){
                navigate("/brand/dashboard")
            } else if(role =="producer"){
                navigate("/producer/dashboard")
            }
            
        }
        catch(err){
            console.log(err)
            const backendError = err.response?.data?.error || "Login failed"
            userDispatch({type:"SERVER_ERROR", payload:backendError})
        }
     }   

     const handlelogout = () =>{
        localStorage.removeItem("token")
        userDispatch({type: "LOG_OUT"})
    }

    const handleUpdateUser = async(formData) =>{
        try{
            const token = localStorage.getItem("token")
            const response = await axios.put(
                `/users/update/${userState.user._id}`,
                formData,
                { headers: { Authorization: token } }
            )
            userDispatch({type: "UPDATE_USER", payload: response.data})
            alert("Profile updated successfully")
        }catch(err){
            console.log(err)
            userDispatch({type:"SERVER_ERROR", payload:"Update failed"})
        }
    }

   return (
    <UserContext.Provider value ={{ ...userState, handleregister,handlelogin , handlelogout, handleUpdateUser}}>
        {props.children}
    </UserContext.Provider>  
   )
}