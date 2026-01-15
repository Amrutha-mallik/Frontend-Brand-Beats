import {myproposal} from "../slice/brand-slice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function MyProposal(){
    const dispatch = useDispatch()
    const {proposal} = useSelector((state)=>{
        return state.Brand
    })

    useEffect(()=>{
        dispatch(myproposal())
    },[])
    return(
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", color: "#0b87c1" }}> My Proposals - {proposal.length} </h2>

            {proposal.length == 0? (
                <p style={{ textAlign: "center", color: "#999" }}> No Proposal found</p>
            ) : (
            <div style={{ display: "grid", gap: "16px" }}>
                {proposal.map((ele)=>{
                    return(
                        <div key={ele._id} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", background: "#fff" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", alignItems: "center" }}>
                                <div>
                                    <p style={{ margin: "0 0 8px 0", fontWeight: "600", color: "#0f1724" }}>{ele.projectId?.title}</p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{ele.projectId?.email}</p>
                                </div>
                                <div>
                                    <span style={{
                                        display: "inline-block",
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        background: ele.status === "Accepted" ? "#d1fae5" : ele.status === "Pending" ? "#fef3c7" : "#fee2e2",
                                        color: ele.status === "Accepted" ? "#065f46" : ele.status === "Pending" ? "#92400e" : "#7f1d1d"
                                    }}>
                                        {ele.status}
                                    </span>
                                </div>
                                {ele.status === "Accepted" && (
                                    <>
                                    <Link to={`/chat/${ele.projectId?._id}`} style={{ textDecoration: "none" }}>
                                        <button style={{ padding: "8px 16px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                                            Chat
                                        </button>
                                    </Link>
                                    <Link to="/files">
                                    <button style={{ padding: "8px 16px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                                        Upload Files </button>
                                    </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            )}

           
        </div>
    )
}