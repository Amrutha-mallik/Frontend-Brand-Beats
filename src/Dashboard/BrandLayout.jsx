import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react"
import "../Styles/brand.css";
import UserContext from "../context/userContext"
import { useNavigate } from "react-router-dom";


export default function BrandLayout() {
    const navigate = useNavigate()
     const { handlelogout } = useContext(UserContext)


    const handleLogoutClick = () => {
    handlelogout()
    navigate("/login")
  }
  return (
    <div className="brand-wrapper">
      <aside className="brand-sidebar">
        <h3 className="brand-logo">Brand</h3>

        <nav className="brand-nav">
          <NavLink to="dashboard" className="side-link">Dashboard</NavLink>
          <NavLink to="createproject" className="side-link">Create Project</NavLink>
          <NavLink to="myproject" className="side-link">My Projects</NavLink>
          <NavLink to="uploadedfiles" className="side-link" >UpLoaded Files</NavLink>
          <NavLink to="profile" className="side-link">Profile</NavLink>
          <button
          onClick={handleLogoutClick}
          style={{
            width: "100%",
            padding: "8px 10px",
            margin: 0,
            color: "#fff",
            background: "#ef4444",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#dc2626"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#ef4444"}
        >
          Logout
        </button>
        </nav>
      </aside>

      <main className="brand-content">
        <Outlet />
      </main>
    </div>
  );
}
