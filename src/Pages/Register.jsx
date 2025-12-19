import { useState, useEffect } from "react"
import UserContext from "../context/userContext"
import { useContext } from "react"
import axios from "../config/a"
import "../Styles/register.css"

export default function Register(props){
    const[name, setname] = useState("")
    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [bio, setBio] = useState("")
    const [adminExists, setAdminExists] = useState(null)
    const {handleregister ,serverError} = useContext(UserContext)

   useEffect(() => {
    const fetchAdmin = async () => {
        try {
            const res = await axios.get("/check-admin");
            setAdminExists(res.data.adminExists);  // true or false
        } catch (err) {
            console.log("Admin check error:", err);
        }
    };
        fetchAdmin();
    }, [])

    const handlesubmit =(e) =>{
        e.preventDefault()
        const formdata = {
            name,
            email,
            password,
            bio,
            role
        }
        handleregister(formdata)
    }
    return(
        <div className="register-container">
            <h2> Register page</h2>
                {serverError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                    {Array.isArray(serverError)
                        ? serverError.map((err, index) => (
                            <div key={index}>{err.message}</div>
                          ))
                        : serverError}
                </div>
            )}
            <form onSubmit = {handlesubmit}>
                <div>
                    
                    <input   type = "text"  name = "name"value ={name} onChange = { (e) =>{setname(e.target.value)}}  placeholder = "Enter your name"/>
                </div>
                <div>
                    
                    <input type= "email" name = "email" value = {email} onChange={(e) => {setEmail(e.target.value)}} placeholder=" Enter your Email " />
                </div>
                <div>
                    
                    <input  type ="password" name ="password" value ={password} onChange = {(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password"/>
                </div>
                <div>
                    <select value = {role} name= "role" onChange={(e) => {setRole(e.target.value)}}> 
                    <option value = ""> select role</option>
                    {!adminExists && <option value="admin">Admin</option>}
                    <option value = "brand"> Brand</option> 
                    <option value = "producer">producer </option>
                    </select>
                </div>
                <div>
                   
                    <input  type = "text" name="bio" value = {bio} onChange = {(e) =>{setBio(e.target.value)}} placeholder=" Enter a bio"/>
                </div>
                <input type = "submit"/>
            </form>
        </div>
    )
}