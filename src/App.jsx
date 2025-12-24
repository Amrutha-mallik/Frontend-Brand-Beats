// import {Link, Route, Routes} from "react-router-dom"
// import { useNavigate } from "react-router-dom"
// import Login from "./Pages/Login"
// import Home from "./Pages/Home"
// import Register from "./Pages/Register"
// import Dashboard from "./Pages/Dashboard"
// import MyProfile from "./Pages/MyProfile"
// import Admin from "./Dashboard/Admin"
// import Brand from "./Dashboard/Brand"
// import Producer  from "./Dashboard/Producer"
// import { useContext } from "react"
// import UserContext from "./context/userContext"
// import BrowseProject from "./Producers/BrowseProject"
// import PrivateRoute from "./component/PrivateRoute"
// import Projectview from "./Producers/Projectview"
// import MyProject from "./Brands/MyProject"
// import ShowProject from "./Admin/ShowProject"
// import ProjectForm from "./Brands/ProjectForm"
// import Brandlist from "./Admin/Brandlist"
// import Producerlist from "./Admin/Producerlist"


// export default function App(){
//   const navigate = useNavigate()

//   const {isLogged, handlelogout, user} = useContext(UserContext)

//   const handlelogoutClick =() =>{
//     handlelogout()
//     navigate("/login")
//   }
//   return(
//     <div>
//       <h2> Welcome to Brand Beats </h2>
//       <ul>
        
//         {(isLogged || localStorage.getItem('token')) ? (
//           <>
//           {isLogged && user?.role === "admin" && (
//           //   <>
//           // <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
//           // <li> <Link to = "/showproject"> Show Project</Link></li>
//           // <li> <Link to = "/listbrand">Brand List</Link></li>
//           // <li> <Link to = "/listproducer">Producer List</Link></li>
//           // </>

//         )}

//         {isLogged && user?.role === "brand" && (
//           <>
//           <li><Link to="/brand-dashboard">Brand Dashboard</Link></li>
//           <li> <Link to ="/myproject"> MY Project</Link></li>
//           <li> <Link to ="/createproject">Create Project</Link></li>
//           </>
//         )}

//         {isLogged && user?.role === "producer" && (
//           <>
//           <li><Link to="/producer-dashboard">Producer Dashboard</Link></li>
//           <li><Link to="/browserproject">Browser Project</Link></li>
//           </>
//         )}
//          <li> <Link to="/">Home</Link></li>
//         <li><Link to ="/MyProfile">MyProfile</Link></li>
//         <button onClick = {handlelogoutClick}>logout</button>
//           </>
//         ):(
//           <>
//         <li><Link to ="/login"> Login</Link> </li>
//         <li><Link to="register">Register</Link></li>
//         </>
//         )}
//       </ul>

//       <Routes>
//         <Route path="/login" element ={<Login/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/" element={<Home/>}/>
//         <Route  path="/MyProfile" element ={<MyProfile/>}/>
//         <Route  path="/admin-dashboard" element = {<Admin/>}/>
//         <Route  path = "/brand-dashboard" element = {<Brand/>}/>
//         <Route  path = "/producer-dashboard" element = { <PrivateRoute allowRoles={['producer']}> <Producer/></PrivateRoute>}/>
//         <Route  path = "/browserproject" element = { <PrivateRoute allowRoles={['producer']}> <BrowseProject/></PrivateRoute>}/>
//         <Route path="/projectview/:id" element={<Projectview />} />
//         <Route  path = "/myproject"  element ={<MyProject/>}/>
//         <Route  path = "/showproject" element={<ShowProject/>}/>
//         <Route  path = "/createproject" element ={<ProjectForm/>}/>
//         <Route  path = "/listbrand" element = {<Brandlist/>}/>
//         <Route path = "/listproducer" element = {<Producerlist/>}/>
//       </Routes>
      
//     </div>
//   ) 
// }

import { Link, Route, Routes, useNavigate, Navigate  } from "react-router-dom"
import { useContext, useEffect  } from "react"
import UserContext from "./context/userContext"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import MyProfile from "./Pages/MyProfile"

import Admin from "./Dashboard/Admin"
import AdminLayout from "./Dashboard/AdminLayout"
import Brand from "./Dashboard/Brand"
import Producer from "./Dashboard/Producer"

import BrowseProject from "./Producers/BrowseProject"
import PrivateRoute from "./component/PrivateRoute"
import Projectview from "./Producers/Projectview"
import MyProject from "./Brands/MyProject"
import ShowProject from "./Admin/ShowProject"
import ProjectForm from "./Brands/ProjectForm"
import Brandlist from "./Admin/Brandlist"
import Producerlist from "./Admin/Producerlist"
import ProjectProposal from "./Brands/ProjectProposal"
import Proposal from "./Admin/Proposal"


export default function App() {
  const navigate = useNavigate()
  const { isLogged, handlelogout, user } = useContext(UserContext)

  // Auto-redirect admin to dashboard only on initial login (when entering from non-admin pages)
  useEffect(() => {
    if (isLogged && user?.role === "admin") {
      const currentPath = window.location.pathname
      // Only redirect if not already on an admin page
      if (!currentPath.startsWith("/admin")) {
        navigate("/admin/dashboard", { replace: true })
      }
    }
  }, [isLogged, user?.role])

  const handlelogoutClick = () => {
    handlelogout()
    navigate("/login")
  }

  return (
    <div>

      {/* Navigation */}
      <ul className="app-nav">
        {(isLogged || localStorage.getItem('token'))? (
          <>
            {user?.role === "brand" && (
              <>
                <li><Link to="/brand-dashboard">Brand Dashboard</Link></li>
                <li><Link to="/myproject">My Project</Link></li>
                <li> <Link to ="/createproject">Create Project</Link></li>
                
              </>
            )}

            {user?.role === "producer" && (
              <>
                <li><Link to="/producer-dashboard">Producer Dashboard</Link></li>
                <li><Link to="/browserproject">Browse Project</Link></li>
              </>
            )}

            {/* Only show My Profile and Logout if NOT admin (admin has these in sidebar) */}
            {user?.role !== "admin" && (
              <>
                <li><Link to="/MyProfile">My Profile</Link></li>
                <li><Link to="/">Home</Link></li>
                <button onClick={handlelogoutClick}>Logout</button>
              </>
            )}
          </>
        ) : (
          <>
            {/* <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li> */}
          </>
        )}
      </ul>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/MyProfile" element={<MyProfile />} />

        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Admin />} />
          <Route path="projects" element={<ShowProject />} />
          <Route path="producers" element={<Producerlist />} />
          <Route path="brands" element={<Brandlist />} />
          <Route path="profile" element={<MyProfile />} />
          <Route  path = "proposal" element = {<Proposal/>}/>
        </Route>

        {/* Brand */}
        <Route path="/brand-dashboard" element={<Brand />} />
        <Route path="/myproject" element={<MyProject />} />
        <Route path="/createproject" element={<ProjectForm />} />

        {/* Producer */}
        <Route
          path="/producer-dashboard"
          element={
            <PrivateRoute allowRoles={["producer"]}>
              <Producer />
            </PrivateRoute>
          }
        />
        <Route
          path="/browserproject"
          element={
            <PrivateRoute allowRoles={["producer"]}>
              <BrowseProject />
            </PrivateRoute>
          }
        />

        <Route path="/projectview/:id" element={<Projectview />} />
        <Route path="/projectsbyproposal/:id" element={<ProjectProposal />} />

      </Routes>
    </div>
  )
}
