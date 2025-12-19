import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

export default function Header({ title }) {
  const navigate = useNavigate();
  const { handlelogout, user } = useContext(UserContext);

  const handleLogoutClick = () => {
    handlelogout();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <h2 style={styles.logo}>Brand Beats</h2>
        {title && <p style={styles.title}>{title}</p>}
      </div>

      <div style={styles.rightSection}>
        <span style={styles.userName}>👤 {user?.name || "User"}</span>
        <Link to="/MyProfile" style={styles.link}>
          My Profile
        </Link>
        <button onClick={handleLogoutClick} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #0ea5e9, #0b87c1)",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.15)",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    color: "white",
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
  },
  title: {
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
    fontSize: "14px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userName: {
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0.2)",
    fontSize: "14px",
    transition: "background 0.2s",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "rgba(255, 255, 255, 0.3)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.2s",
  },
};
