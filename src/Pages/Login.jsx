import {useFormik} from "formik"
import { useContext, useState} from "react"
import UserContext from "../context/userContext"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import "../Styles/login.css"
export default function Login(){
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)


    const { handlelogin, serverError} = useContext(UserContext)

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:(values)=>{
            // console.log(values)
            setSubmitted(true)
            handlelogin(values)
            
        }  
    })
//    
return (
  <div className="login-page-wrapper">
    <div className="auth-card">
      <div className="auth-header">
        <h2>Login</h2>
      </div>
      <div className="auth-body">
        
        { submitted  && serverError && (
            <div className="error">
            {Array.isArray(serverError)
            ? serverError.map((err, index) => (
            <p key={index}>{err.message}</p>
            ))
      : <p>{serverError}</p>}
  </div>
)}
        <form onSubmit={formik.handleSubmit}>
        <p className="auth-switch">
        Don’t have an account?
        <Link to="/register"> Signup</Link>
        </p>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email address"
          />

        <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Password"
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} </span>
        </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  </div>
);
}