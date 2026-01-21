import {fetchFilesByProjectId, approveFile} from "../slice/file-slice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useParams } from "react-router-dom"
export default function UploadedFiles(){
    const dispatch = useDispatch()
    const { projectId } = useParams()

    useEffect(()=>{
        dispatch(fetchFilesByProjectId(projectId))
    },[])

    const{data}= useSelector((state)=>{
        return state.Files
    })
    return(
        <div>
            <h2> Uploaded Files</h2>
            {data.map((ele)=>{
                return(
                    <li key = {ele._id}>
                        <strong>{ele.filename}</strong>
                        <br/>
                        <span>Version: {ele.version}</span>
                        <br/>
                        <a href={ele.fileUrl} target="_blank" rel="noreferrer" style={{ color: "blue" }}>
                            View / Download </a>
                            <span style={{color:ele.approvalStatus === "approved"? "green": ele.approvalStatus === "rejected"? "red": ""}}>
                            {ele.approvalStatus.toUpperCase()}</span>
                            <button 
                            onClick={()=>{dispatch(approveFile({ id: ele._id, status: "approved" }))}}>Approve</button>
                            <button onClick = {()=>{dispatch(approveFile({ id: ele._id, status: "rejected" }))}}>Reject</button>

                    </li>
                )
            })}
        </div>
    )
}