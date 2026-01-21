import { Link, Route, Routes, useNavigate, Navigate  } from "react-router-dom"
import { useContext, useEffect  } from "react"
import UserContext from "./context/userContext"

import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import MyProfile from "./Pages/MyProfile"
import EditProfile from "./Pages/EditProfile"

import Admin from "./Dashboard/Admin"
import AdminLayout from "./Dashboard/AdminLayout"
import Brand from "./Dashboard/Brand"
import Producer from "./Dashboard/Producer"

import MyProposal from "./Producers/MyProposal"
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
import ChatPage from "./chats/ChatPage"
import Files from "./File-upload/Files"
import BrandLayout from "./Dashboard/BrandLayout"
import ProducerLayout from "./Dashboard/ProducerLayout"
import UploadedFiles from "./Brands/UploadedFiles"
import PendingBrands from "./Admin/PendingBrands"

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

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/MyProfile" element={<MyProfile />} /> */}
        <Route path = "/edit" element={<EditProfile/>} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path ="/files" element={<Files/>}/>

        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Admin />} />
          <Route path="projects" element={<ShowProject />} />
          <Route path="producers" element={<Producerlist />} />
          <Route path="brands" element={<Brandlist />} />
          <Route path="profile" element={<MyProfile />} />
          <Route  path = "proposal" element = {<Proposal/>}/>
          <Route  path="proposalpending" element = {<PendingBrands/>}/>
        </Route>

        {/* Brand */}
        <Route path="/brand" element={<BrandLayout />}>
          <Route path="dashboard" element={<Brand />} />
          <Route path="createproject" element={<ProjectForm />} />
          <Route path="myproject" element={<MyProject />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="myproject/projectsbyproposal/:id" element={<ProjectProposal />}/>
          <Route path="myproject/uploadedfiles/:projectId" element = {<UploadedFiles/>}/>
        </Route>

        {/* Producer */}
        <Route path="/producer" element={<PrivateRoute allowRoles={["producer"]}><ProducerLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<Producer />} />
          <Route path="browseprojects" element={<BrowseProject />} />
          <Route path="myproposals" element={<MyProposal />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path ="files/:projectId" element={<Files/>}/>
          <Route path="projectview/:id" element={<Projectview />} />
           <Route  />
        </Route>
    </Routes>
    </div>
  )
}
