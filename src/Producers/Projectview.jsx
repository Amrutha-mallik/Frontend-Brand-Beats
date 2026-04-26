import { useSelector } from "react-redux"
import { fetchOneProject } from "../slice/producer-slice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Proposal from "../Producers/Proposal"
import "../Styles/projectview.css"
import axios from "axios"

export default function Projectview() {
  const [openForm, setOpenForm] = useState(null)
  const [aiSummary, setAiSummary] = useState("")
  const [loadingAi, setLoadingAi] = useState(false)

  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { singleProject, isLoading } = useSelector((state) => state.Producer)

  useEffect(() => {
    dispatch(fetchOneProject(id))
  }, [id])

  // ✅ If project already has aiSummary saved, show it directly
  useEffect(() => {
    if (singleProject?.aiSummary) {
      setAiSummary(singleProject.aiSummary)
    }
  }, [singleProject])

  const handleGenerateSummary = async () => {
    setLoadingAi(true)
    setAiSummary("")
    try {
      const res = await axios.post(
        `/api/projects/${id}/summary`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      setAiSummary(res.data.aiSummary)
    } catch (err) {
      console.log(err)
      setAiSummary("Failed to generate summary. Please try again.")
    } finally {
      setLoadingAi(false)
    }
  }

  if (isLoading || !singleProject) {
    return <div className="loading">Loading project...</div>
  }

  return (
    <div className="projectview-container">
      <div className="project-details">
        <div className="detail-row">
          <span className="detail-label">TITLE</span>
          <span className="detail-value">{singleProject.title}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">EMAIL</span>
          <span className="detail-value">{singleProject.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">DESCRIPTION</span>
          <span className="detail-value">{singleProject.description}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">GENRE</span>
          <span className="detail-value">{singleProject.genre}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">BUDGET</span>
          <span className="detail-value">${singleProject.budget}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">BRAND NAME</span>
          <span className="detail-value">{singleProject?.brandId?.name || "Brand removed"}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">STATUS</span>
          <span className="detail-value">{singleProject.status}</span>
        </div>

        



        {/* ✅ AI SUMMARY SECTION */}
        <div className="detail-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="detail-label">AI SUMMARY</span>
            <button
              onClick={handleGenerateSummary}
              disabled={loadingAi}
              style={{
                background: loadingAi ? "#94a3b8" : "#7c3aed",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                fontWeight: 600,
                fontSize: 13,
                cursor: loadingAi ? "not-allowed" : "pointer"
              }}
            >
              {loadingAi ? "Generating..." : "✨ Generate AI Summary"}
            </button>
          </div>

          {aiSummary && (
            <div style={{
              background: "#f5f3ff",
              border: "1px solid #ddd6fe",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#4c1d95",
              fontSize: 14,
              lineHeight: 1.7,
              width: "100%"
            }}>
              {aiSummary}
            </div>
          )}
        </div>

      </div>

      <div className="button-section">
        {singleProject.status === "Open" && !singleProject.producerId ? (
          !openForm && (
            <button onClick={() => setOpenForm(true)} className="send-proposal-btn">
              Send Proposal
            </button>
          )
        ) : (
          <p style={{ color: "red", fontWeight: "500" }}>Proposals are closed 🚫</p>
        )}
      </div>

      <button onClick={() => navigate("/producer/browseprojects")}>cancel</button>

      {openForm && (
        <div className="proposal-form-wrapper">
          <Proposal projectId={id} closeForm={() => setOpenForm(false)} />
        </div>
      )}
    </div>
  )
}