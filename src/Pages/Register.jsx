import { useState, useEffect } from "react"
import UserContext from "../context/userContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "../config/a"
import { useFormik } from "formik"
import * as Yup from "yup"
import "../Styles/register.css"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  bio: Yup.string()
    .required("Bio is required")
    .min(5, "Bio must be at least 5 characters"),
  role: Yup.string()
    .required("Role is required"),
  businessDescription: Yup.string()
    .when("role", {
      is: "brand",
      then: (schema) => schema.required("Business description is required for brands")
    })
})

export default function Register(props){
  const [showPassword, setShowPassword] = useState(false)
  const [adminExists, setAdminExists] = useState(null)
  const {handleregister ,serverError} = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      bio: "",
      businessDescription: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formdata = {
        name: values.name,
        email: values.email,
        password: values.password,
        bio: values.bio,
        role: values.role,
        businessDescription: values.businessDescription,
      }
      handleregister(formdata)
    }
  })

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

return (
  <div className="register-page-wrapper">
    <div className="auth-card">
      <div className="auth-header">
        <h2>Signup</h2>
      </div>

      <div className="auth-body">
        {serverError && (
          <div className="error">
            {Array.isArray(serverError)
              ? serverError.map((e, i) => <div key={i}>{e.message}</div>)
              : serverError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>

            <p className="auth-switch">
                Already registered?
                <Link to="/login"> Login</Link></p>
          
          <input 
            type="text" 
            placeholder="Full name" 
            name="name"
            value={formik.values.name} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="error">{formik.errors.name}</span>
          )}

          <input 
            type="email" 
            placeholder="Email address" 
            name="email"
            value={formik.values.email} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="error">{formik.errors.email}</span>
          )}

          <div className="password-field">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />} 
            </span> 
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="error">{formik.errors.password}</span>
          )}

          <select 
            name="role"
            value={formik.values.role} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select role</option>
            {!adminExists && <option value="admin">Admin</option>}
            <option value="brand">Brand</option>
            <option value="producer">Producer</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <span className="error">{formik.errors.role}</span>
          )}

          {formik.values.role === "brand" && (
            <>
              <textarea 
                placeholder="Business Description"  
                name="businessDescription"
                style={{ width: "100%", marginBottom: "15px", padding: "15px" }} 
                value={formik.values.businessDescription} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.businessDescription && formik.errors.businessDescription && (
                <span className="error">{formik.errors.businessDescription}</span>
              )}
              <p className="text-sm text-gray-500">
                Your account will be reviewed by admin before approval
              </p>
            </>
          )}

          <input 
            type="text" 
            placeholder="Bio" 
            name="bio"
            value={formik.values.bio} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bio && formik.errors.bio && (
            <span className="error">{formik.errors.bio}</span>
          )}

          <input type="submit" value="Signup" />
        </form>
      </div>
    </div>
  </div>
)
}