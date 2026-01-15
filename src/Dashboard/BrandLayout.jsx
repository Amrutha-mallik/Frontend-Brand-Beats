// import { Link, Outlet } from "react-router-dom";

// export default function BrandLayout() {
//   return (
//     <div style={styles.wrapper}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <h3 style={styles.logo}>Brand</h3>

//         <nav style={styles.nav}>
//           <Link style={styles.navItem} to="/brand-dashboard">Dashboard</Link>
//           <Link style={styles.navItem} to="/createproject">Create New Project</Link>
//           <Link style={styles.navItem} to="/myproject">My Projects</Link>
//           <Link style={styles.navItem} to="/MyProfile">Profile</Link>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main style={styles.content}>
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     display: "flex",
//     minHeight: "100vh",
//     background: "#f8fafc"
//   },
//   sidebar: {
//     width: 240,
//     background: "#ffffff",
//     borderRight: "1px solid #e5e7eb",
//     padding: 20
//   },
//   logo: {
//     marginBottom: 30,
//     fontSize: 22,
//     fontWeight: 700
//   },
//   nav: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 14
//   },
//   navItem: {
//     textDecoration: "none",
//     color: "#334155",
//     fontWeight: 500,
//     padding: "10px 12px",
//     borderRadius: 8
//   },
//   content: {
//     flex: 1,
//     padding: 30
//   }
// };
