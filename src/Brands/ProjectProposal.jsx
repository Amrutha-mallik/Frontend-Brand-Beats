import {fetchproposal} from "../slice/brand-slice"
import {assignProducer} from "../slice/producer-slice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useParams } from "react-router-dom"
export default function ProjectProposal({projectId,proposalId }){
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(()=>{
        dispatch(fetchproposal(id))
    },[id])

    const {proposal} = useSelector((state) =>{
        return state.Brand
    })

    const handleassign =(proposalId)=>{
        dispatch(assignProducer({projectId: id, proposalId}))
        console.log( "id", proposalId)
    }

    return (
        <div>
            <h2> proposals - {proposal.length}</h2>
            {proposal.map((ele)=>{
                return(
                <div key={ele._id} style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "10px" }}>
                <p><b>Producer Name:</b> {ele.producerId?.name}</p>
                <p><b>Email:</b> {ele.producerId?.email}</p>

                <p><b>Project:</b> {ele.projectId?.title}</p>

                <p><b>Proposal Text:</b></p>
                <p>{ele.proposalText}</p>

                <p><b>Price Offer:</b> ₹{ele.priceOffer}</p>

                <p><b>Status:</b> {ele.status}</p>
                {ele.attachments?.length > 0 && (
                <p>
                <b>Attachment:</b>{" "}
                <a href={ele.attachments[0].url} target="_blank" rel="noreferrer">
                 View File
                </a>
                </p>
            )}
            {ele.proposalResume?.length > 0 && (
                <p>
                <b>Resume:</b>{" "}
                <a
                href={`https://docs.google.com/gview?url=${ele.proposalResume[0].url}&embedded=true`}
                target="_blank"
                rel="noreferrer">View Resume</a>

                </p>
            )}
            {ele.status == "Pending" &&(
                <button onClick = {()=>handleassign(ele._id)}> Assign Producer</button>
            )}

            {ele.status == "Accepted" && (<span style={{ color: "green" }}>Assigned ✅</span>)}
            
                </div>
                )
            })}

        </div>
    )
}