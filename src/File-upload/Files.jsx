import {uploadfile, fetchFilesByProjectId, deleteFileById} from "../slice/file-slice"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useParams } from "react-router-dom"
export default function Files( producerId ){
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const[files, setFiles]= useState(null)
    const {data, isLoading} = useSelector((state)=>{
        return state.Files
    })
    const { projectId } = useParams();

    useEffect(()=>{
        dispatch(fetchFilesByProjectId(projectId))
    },[projectId])

    const handleupload =()=>{
          if (!files) return alert("Select file");
        if (!projectId) return alert("Project ID is missing!");

            const formData = new FormData();
            formData.append("fileUrl", files);
            formData.append("projectId", projectId);
            formData.append("filename", files.name);
            console.log(files)
            
            dispatch(uploadfile(formData)).then(()=>{
                dispatch(fetchFilesByProjectId(projectId))
            });
            setFiles(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
    }
    return(
        <div>
            <h2>  Files </h2>
            <input  type="file" ref={fileInputRef}  onChange={(e) =>{setFiles(e.target.files[0])}}/>

            <button onClick={handleupload} disabled={isLoading}>UpLoad files</button>
            <h3>Uploaded Files </h3>
            {data.length == 0  ? (<p> No uploaded Files</p>) :(
                <ul>
                    {data.map((ele)=>{
                        return(
                        
                            <li key = {ele._id}>
                                <strong>{ele.filename}</strong>
                                <br/>
                                <span>Version: {ele.version}</span>
                                <br/>
                                    <a href={ele.fileUrl} target="_blank" rel="noreferrer" style={{ color: "blue" }}>
                                    View / Download </a>
                                    <span style={{color:ele.approvalStatus === "approved"? "green": ele.approvalStatus === "rejected"? "red": "orange"}}>
                                        {(ele.approvalStatus || "pending").toUpperCase()}
                                    </span>
                                    {ele.approvalStatus !=="approved" && (
                                <button onClick={()=>{
                                    if(window.confirm("are you sure")){
                                        dispatch(deleteFileById(ele._id))
                                    }
                                }}> Delete File</button>

                                    )}

                            </li>
                           
                        )
                    })}
                </ul>
            )}
  
        </div>
    )
}