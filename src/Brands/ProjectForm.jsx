import {useState} from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProjects } from "../slice/producer-slice";

export default function ProjectForm() {
  const[project, setProject] = useState({
      title: "",
      description: "",
      genre: "",
      budget: "",
      deadline: "",
      status: "Draft"
    })

    const handleChange  =(e) =>{
      setProject({...project, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
      dispatch(createProjects(project))
      navigate("/myproject")

    }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="create-project-card" style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
      <h2 style={{ marginBottom: 12 }}>Create Project</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Title</label>
          <input
            name="title"
            value={project.title}
            onChange={handleChange}
            placeholder="Project title"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the project..."
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Genre</label>
            <input
              name="genre"
              value={project.genre}
              onChange={handleChange}
              placeholder="e.g., Pop, EDM"
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
          </div>

          <div style={{ width: 140 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Budget</label>
            <input
              type="number"
              name="budget"
              value={project.budget}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
          </div>

          <div style={{ width: 160 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
            >
              <option>Open</option>
              <option>Closed</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Attachments (optional)</label>
          <input
            type="file"
            multiple
            onChange={(e) => setProject("attachments", e.target.files)}
          />
        </div>


        <div style={{ marginBottom: 10 }}>
  <label style={{ fontWeight: 600 }}>Deadline</label>
  <input
    type="date"
    name="deadline"
    value={project.deadline}
    onChange={handleChange}
    style={{ width: "100%", padding: 10 }}
  />
</div>


        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <button
            type="submit"
            value="submit"
            style={{
              background: "#0ea5e9",
              color: "#fff",
              padding: "10px 16px",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
          </button>

          {/* <button
            type="button"
            onClick={() => resetForm()}
            style={{
              background: "#e5e7eb",
              color: "#111",
              padding: "10px 16px",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Reset
          </button> */}
        </div>
      </form>
    </div>
  );
}
