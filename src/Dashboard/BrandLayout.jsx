import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react"
import "../Styles/brand.css";
import UserContext from "../context/userContext"
import { useNavigate } from "react-router-dom";

export default function BrandLayout() {
    const navigate = useNavigate()
    const {handlelogout, user} = useContext(UserContext)

    const isApproved = user?.isApproved

    const handleLogoutClick = () => {
    handlelogout()
    navigate("/login")
  }
    const disabledLink = !isApproved ? "side-link disabled" : "side-link"

  return (
    <div className="brand-wrapper">
      <aside className="brand-sidebar">
        <h3 className="brand-logo">Brand</h3>

        <nav className="brand-nav">
          
          <NavLink to="dashboard" className="side-link">Dashboard</NavLink>
          <NavLink to={isApproved ? "createproject" : "#"} className={disabledLink}>Create Project</NavLink>
          <NavLink to={isApproved ? "myproject" : "#"}className={disabledLink}>My Projects</NavLink>
          <NavLink to={isApproved ? "uploadedfiles" : "#"}className={disabledLink}>Uploaded Files</NavLink>
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
