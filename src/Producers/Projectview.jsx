import { useSelector } from "react-redux"
import {fetchOneProject} from "../slice/producer-slice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Proposal from "../Producers/Proposal"
import "../Styles/projectview.css"

export default function Projectview(){
    const[openForm, setOpenForm] = useState(null)

    const dispatch = useDispatch()
    const { id } = useParams()

    const {singleProject, isLoading} = useSelector((state)=>{
        return state.Producer
    })

    useEffect(()=>{
        dispatch(fetchOneProject(id))
    },[id])

    if (isLoading || !singleProject) {
        return <div className="loading">Loading project...</div>
    }

    return(
        <div className="projectview-container">
            <div className="project-details">
                <div className="detail-row">
                    <span className="detail-label">TITLE</span>
                    <span className="detail-value">{singleProject.title}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Email</span>
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
            </div>

            <div className="button-section">
                {!openForm && (
                    <button
                        onClick={() => setOpenForm(true)}
                        className="send-proposal-btn"
                    >
                        Send Proposal
                    </button>
                )}
            </div>

            {openForm && (
                <div className="proposal-form-wrapper">
                    <Proposal
                        projectId={id}
                        closeForm={() => setOpenForm(false)}
                    />
                </div>
            )}
        </div>
    )
}