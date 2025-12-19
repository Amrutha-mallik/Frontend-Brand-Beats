import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchbrand } from "../slice/producer-slice";

export default function MyProject() {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.Producer);

  // Always fetch brand projects on mount to show latest data
  useEffect(() => {
    dispatch(fetchbrand());
  }, [dispatch]);

  if (isLoading) {
    return <h3 style={{ textAlign: "center", marginTop: "30px" }}>Loading projects...</h3>;
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#0b87c1", marginBottom: "24px" }}>My Projects</h2>

      {!projects || projects.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: "16px", color: "#666" }}>No projects found</p>
          <p style={{ fontSize: "14px", color: "#999" }}>Create a new project to get started</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {projects.map((project) => (
            <div
              key={project._id}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
            >
              <h3 style={{ color: "#0f1724", marginBottom: "12px", fontSize: "18px" }}>
                {project.title || "Untitled"}
              </h3>

              <div style={{ display: "grid", gap: "8px", fontSize: "14px" }}>
                <p style={{ margin: 0, color: "#444" }}>
                  <strong style={{ color: "#0b87c1" }}>Description:</strong> {project.description || "—"}
                </p>
                <p style={{ margin: 0, color: "#444" }}>
                  <strong style={{ color: "#0b87c1" }}>Genre:</strong> {project.genre || "—"}
                </p>
                <p style={{ margin: 0, color: "#444" }}>
                  <strong style={{ color: "#0b87c1" }}>Budget:</strong> ₹{project.budget || "0"}
                </p>
              </div>

              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    background: project.status === "Open" ? "#d1fae5" : "#fef3c7",
                    color: project.status === "Open" ? "#065f46" : "#92400e",
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                >
                  {project.status || "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
