import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../context/userContext"
import "../Styles/admin.css"

export default function AdminLayout() {
  const navigate = useNavigate()
  const { handlelogout } = useContext(UserContext)

  const handleLogoutClick = () => {
    handlelogout()
    navigate("/login")
  }

  return (
    <div className="admin-container">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Brand Beats</h2>

        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/projects">Projects</NavLink>
        <NavLink to="/admin/producers">Producers</NavLink>
        <NavLink to="/admin/proposal">Proposal</NavLink>
        <NavLink to="/admin/brands">Brands</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>

        {/* Divider */}
        <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

        {/* Profile & Logout */}
        <NavLink to="/admin/profile" style={{ marginBottom: "8px" }}>👤 My Profile</NavLink>
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
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
