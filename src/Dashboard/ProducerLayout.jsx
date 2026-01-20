import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";
import "../Styles/producer.css";

export default function ProducerLayout() {
  const { handlelogout } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    handlelogout();
    navigate("/login");
  };

  return (
    <div className="producer-wrapper">
      <aside className="producer-sidebar">
        <h3 className="producer-logo">Producer</h3>

        <nav className="producer-nav">
          <NavLink to="dashboard" className="producer-link">
            Dashboard
          </NavLink>
          <NavLink to="browseprojects" className="producer-link">
            Browse Projects
          </NavLink>
          <NavLink to="myproposals" className="producer-link">
            My Proposals
          </NavLink>
          <Link to="profile" className="producer-link">
            Profile
          </Link>
          <Link to = "files/:projectId" className="producer-link"> File</Link>
        </nav>

        <button className="producer-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="producer-content">
        <Outlet />
      </main>
    </div>
  );
}
