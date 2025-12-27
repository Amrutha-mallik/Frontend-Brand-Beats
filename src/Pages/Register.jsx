import { useState, useEffect } from "react"
import UserContext from "../context/userContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"


import axios from "../config/a"
import "../Styles/register.css"

export default function Register(props){
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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
        setSubmitted(true) 
        const formdata = {
            name,
            email,
            password,
            bio,
            role
        }
        handleregister(formdata)
    }
//     return(
//         <div className="register-container">
//             <h2> Register page</h2>
//                 {serverError && (
//                 <div style={{ color: "red", marginBottom: "10px" }}>
//                     {Array.isArray(serverError)
//                         ? serverError.map((err, index) => (
//                             <div key={index}>{err.message}</div>
//                           ))
//                         : serverError}
//                 </div>
//             )}
//             <form onSubmit = {handlesubmit}>
//                 <div>
                    
//                     <input   type = "text"  name = "name"value ={name} onChange = { (e) =>{setname(e.target.value)}}  placeholder = "Enter your name"/>
//                 </div>
//                 <div>
                    
//                     <input type= "email" name = "email" value = {email} onChange={(e) => {setEmail(e.target.value)}} placeholder=" Enter your Email " />
//                 </div>
//                 <div>
                    
//                     <input  type ="password" name ="password" value ={password} onChange = {(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password"/>
//                 </div>
//                 <div>
//                     <select value = {role} name= "role" onChange={(e) => {setRole(e.target.value)}}> 
//                     <option value = ""> select role</option>
//                     {!adminExists && <option value="admin">Admin</option>}
//                     <option value = "brand"> Brand</option> 
//                     <option value = "producer">producer </option>
//                     </select>
//                 </div>
//                 <div>
                   
//                     <input  type = "text" name="bio" value = {bio} onChange = {(e) =>{setBio(e.target.value)}} placeholder=" Enter a bio"/>
//                 </div>
//                 <input type = "submit"/>
//             </form>
//         </div>
//     )
// }
return (
  <div className="register-page-wrapper">
    <div className="auth-card">
      <div className="auth-header">
        <h2>Signup</h2>
      </div>

      <div className="auth-body">
        {submitted && serverError && (
          <div className="error">
            {Array.isArray(serverError)
              ? serverError.map((e, i) => <div key={i}>{e.message}</div>)
              : serverError}
          </div>
        )}

        <form onSubmit={handlesubmit}>

            <p className="auth-switch">
                Already registered?
                <Link to="/login"> Login</Link></p>
          <input type="text" placeholder="Full name" value={name} onChange={e => setname(e.target.value)} />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          {/* <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /> */}
          <div className="password-field">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />} </span> 
          </div>

          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Select role</option>
            {!adminExists && <option value="admin">Admin</option>}
            <option value="brand">Brand</option>
            <option value="producer">Producer</option>
          </select>

          <input type="text" placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />

          <input type="submit" value="Signup" />
        </form>
      </div>
    </div>
  </div>
)
}