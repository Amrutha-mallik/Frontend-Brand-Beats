// import {useState} from "react"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createProjects } from "../slice/producer-slice";

// export default function ProjectForm() {
//   const [submit, setSubmit] = useState(false)

//   const {error } =  useSelector((state)=>{
//     return state.Producer
//   })
//   const[project, setProject] = useState({
//       title: "",
//       email:"",
//       description: "",
//       genre: "",
//       budget: "",
//       deadline: "",
//       status: "Draft",
//       attachments:[]
      
//     })

//     const handleChange  =(e) =>{
//       setProject({...project, [e.target.name]:e.target.value})
//       setSubmit(false)
//     }

//     const handleSubmit = async(e) =>{
//       e.preventDefault()

//       try{
//         await dispatch(createProjects(project)).unwrap()
//          resetForm()
//          setSubmit(false)
//          navigate("/brand/myproject")
//       }catch(err){
//         console.log(err)
//         setSubmit(true)
//       }

//     }
//     const resetForm = () => {
//     setProject({
//       title: "",
//       email: "",
//       description: "",
//       genre: "",
//       budget: "",
//       deadline: "",
//       status: "Draft",
//       attachments: null
//     });
//   };

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//   return (
//     <div className="create-project-card" >
//       <h2 style={{ marginBottom: 12 }}>Create Project</h2>

//       { submit && error && (
//         <div style={{color:"red"}}>
//           {Array.isArray(error) ? error.map((e, i) => <div key={i}>{e.message} </div>) : error}
//           </div>
//       )}


//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 10 }}>
//           <label style={{ display: "block", fontWeight: 600 }}>Title</label>
//           <input
//             name="title"
//             value={project.title}
//             onChange={handleChange}
//             placeholder="Project title"
//             style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
//           />
//         </div>

//         <div style={{ marginBottom: 10 }}>
//           <label  style={{ display: "block", fontWeight: 600 }}>Email</label>
//           <input type= "text" name="email" value={project.email} onChange={handleChange}placeholder="Brand Email"
//           style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
//           />
//         </div>

//         <div style={{ marginBottom: 10 }}>
//           <label style={{ display: "block", fontWeight: 600 }}>Description</label>
//           <textarea
//             name="description"
//             value={project.description}
//             onChange={handleChange}
//             rows={4}
//             placeholder="Describe the project..."
//             style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
//           />
//         </div>

//         <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
//           <div style={{ flex: 1 }}>
//             <label style={{ display: "block", fontWeight: 600 }}>Genre</label>
//             <select
//               name="genre"
//               value={project.genre}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
//             >
//             <option value="">Select genre</option>
//             <option value="Pop">Pop</option>
//             <option value="Rock">Rock</option>
//             <option value="Hip Hop">Hip Hop</option>
//             <option value="Electronic">Electronic</option>
//             <option value="Classical">Classical</option>
//             <option value="Jazz">Jazz</option>
//           <option value="Other">Other</option> </select>
//           </div>

//           <div style={{ width: 140 }}>
//             <label style={{ display: "block", fontWeight: 600 }}>Budget</label>
//             <input
//               type="number"
//               name="budget"
//               value={project.budget}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
//             />
//           </div>

//           <div style={{ width: 160 }}>
//             <label style={{ display: "block", fontWeight: 600 }}>Status</label>
//             <select
//               name="status"
//               value={project.status}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
//             >
//             <option value="Draft">Draft</option>
//             <option value="Open">Open</option>
//             <option value="InProgress">In Progress</option>

//             </select>
//           </div>
//         </div>

//         <div style={{ marginBottom: 10 }}>
//           <label style={{ display: "block", fontWeight: 600 }}>Attachments (optional)</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) =>
//             setProject({ ...project, attachments:Array.from(e.target.files) })}
//           />
//         </div>


//         <div style={{ marginBottom: 10 }}>
//           <label style={{ fontWeight: 600 }}>Deadline</label>
//           <input
//           type="date"
//           name="deadline"
//           value={project.deadline}
//           onChange={handleChange}
//           style={{ width: "100%", padding: 10 }}
//         />
//         </div>


//         <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
//           <button
//             type="submit"
//             value="submit"
//             style={{
//               background: "#0ea5e9",
//               color: "#fff",
//               padding: "10px 16px",
//               border: "none",
//               borderRadius: 8,
//               fontWeight: 700,
//             }}
//           >Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProjects } from "../slice/producer-slice";

export default function ProjectForm() {
  const [submit, setSubmit] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([]) // store raw File objects separately

  const { error } = useSelector((state) => state.Producer)
  const [project, setProject] = useState({
    title: "",
    email: "",
    description: "",
    genre: "",
    budget: "",
    deadline: "",
    status: "Draft",
  })

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value })
    setSubmit(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      // Send as FormData so multer can receive files on backend
      const formData = new FormData()
      formData.append("title", project.title)
      formData.append("email", project.email)
      formData.append("description", project.description)
      formData.append("genre", project.genre)
      formData.append("budget", project.budget)
      formData.append("deadline", project.deadline)
      formData.append("status", project.status)

      // Append each file
      files.forEach((file) => {
        formData.append("attachments", file)
      })

      await dispatch(createProjects(formData)).unwrap()
      resetForm()
      setSubmit(false)
      navigate("/brand/myproject")
    } catch (err) {
      console.log(err)
      setSubmit(true)
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setProject({ title: "", email: "", description: "", genre: "", budget: "", deadline: "", status: "Draft" })
    setFiles([])
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="create-project-card">
      <h2 style={{ marginBottom: 12 }}>Create Project</h2>

      {submit && error && (
        <div style={{ color: "red" }}>
          {Array.isArray(error) ? error.map((e, i) => <div key={i}>{e.message}</div>) : error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Title</label>
          <input name="title" value={project.title} onChange={handleChange} placeholder="Project title"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Email</label>
          <input type="text" name="email" value={project.email} onChange={handleChange} placeholder="Brand Email"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Description</label>
          <textarea name="description" value={project.description} onChange={handleChange} rows={4}
            placeholder="Describe the project..."
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Genre</label>
            <select name="genre" value={project.genre} onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}>
              <option value="">Select genre</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Electronic">Electronic</option>
              <option value="Classical">Classical</option>
              <option value="Jazz">Jazz</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ width: 140 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Budget</label>
            <input type="number" name="budget" value={project.budget} onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
          </div>

          <div style={{ width: 160 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Status</label>
            <select name="status" value={project.status} onChange={handleChange}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}>
              <option value="Draft">Draft</option>
              <option value="Open">Open</option>
              <option value="InProgress">In Progress</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Attachments (optional)</label>
          <input type="file" multiple
            onChange={(e) => setFiles(Array.from(e.target.files))} />
          {files.length > 0 && (
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              {files.map((f, i) => <div key={i}>📎 {f.name}</div>)}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontWeight: 600 }}>Deadline</label>
          <input type="date" name="deadline" value={project.deadline} onChange={handleChange}
            style={{ width: "100%", padding: 10 }} />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <button type="submit" disabled={uploading}
            style={{ background: "#0ea5e9", color: "#fff", padding: "10px 16px", border: "none", borderRadius: 8, fontWeight: 700 }}>
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}