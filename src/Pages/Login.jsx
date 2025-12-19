import {useFormik} from "formik"
import { useContext } from "react"
import UserContext from "../context/userContext"
import "../Styles/login.css"
export default function Login(){
    const { handlelogin, serverError} = useContext(UserContext)

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:(values)=>{
            // console.log(values)
            handlelogin(values)
        }  
    })
    return(
        <div className="login-container">
            <h2> Login page</h2>
            {serverError &&(<p style = {{color:"red"}}> {serverError}</p>)}
            <form onSubmit={formik.handleSubmit}>
                <div>
                   <input  type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter email"/> 
                </div>
                <div>
                    <input  type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Enter password"/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
        </div>
    )
}