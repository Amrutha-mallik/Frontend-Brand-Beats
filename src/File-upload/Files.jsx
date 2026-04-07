import {uploadfile, fetchFilesByProjectId, deleteFileById} from "../slice/file-slice"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useParams } from "react-router-dom"
import axios from "../config/a"
export default function Files(props){
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
        const selectedFile = files || (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]);
        if (!selectedFile) {
            alert("Select a file to upload");
            return;
        }
        if (!projectId) {
            alert("Project ID is missing!");
            return;
        }

        const formData = new FormData();
        formData.append("fileUrl", selectedFile);
        formData.append("projectId", projectId);
        formData.append("filename", selectedFile.name);
        console.log('Uploading file:', selectedFile);

        dispatch(uploadfile(formData)).then(()=>{
            dispatch(fetchFilesByProjectId(projectId))
        });
        setFiles(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }
    const handleView = async (ele) => {
        try{
            console.log("Attempting to view file:", ele);
            
            const isLocalUrl = ele.fileUrl.includes('localhost') || ele.fileUrl.includes('127.0.0.1');
            let response;

            if (isLocalUrl) {
                // Use axios for local URLs with auth header
                response = await axios.get(ele.fileUrl, {
                    responseType: 'blob',
                    headers: { Authorization: localStorage.getItem("token") }
                });
            } else {
                // Use fetch for Cloudinary URLs (no axios interceptors)
                const fetchResponse = await fetch(ele.fileUrl);
                if (!fetchResponse.ok) {
                    throw new Error(`Failed to fetch file: ${fetchResponse.status}`);
                }
                const blob = await fetchResponse.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
                setTimeout(() => URL.revokeObjectURL(url), 60000);
                return;
            }
            
            console.log("Response received:", response);
            console.log("Response data size:", response.data.size);
            
            const mimeType = ele.fileType || response.headers['content-type'] || 'application/pdf';
            const blob = new Blob([response.data], { type: mimeType });
            
            const url = URL.createObjectURL(blob);
            console.log("Object URL created:", url);
            
            window.open(url, '_blank');
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        }catch(err){
            console.error("Error in handleView:", err);
            alert('Failed to open file. Check console for details.');
        }
    }

    const handleDownload = async (ele) => {
        try{
            console.log("Attempting to download file:", ele);
            
            const isLocalUrl = ele.fileUrl.includes('localhost') || ele.fileUrl.includes('127.0.0.1');
            let blob;

            if (isLocalUrl) {
                // Use axios for local URLs with auth header
                const response = await axios.get(ele.fileUrl, {
                    responseType: 'blob',
                    headers: { Authorization: localStorage.getItem("token") }
                });
                blob = new Blob([response.data]);
            } else {
                // Use fetch for Cloudinary URLs (no axios interceptors)
                const fetchResponse = await fetch(ele.fileUrl);
                if (!fetchResponse.ok) {
                    throw new Error(`Failed to fetch file: ${fetchResponse.status}`);
                }
                blob = await fetchResponse.blob();
            }
            
            console.log("Blob created:", blob);
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = ele.filename || 'file';
            document.body.appendChild(a);
            a.click();
            a.remove();
            
            setTimeout(() => {
                URL.revokeObjectURL(url);
                console.log("Download - Object URL revoked");
            }, 10000);
        }catch(err){
            console.error("Error in handleDownload:", err);
            alert('Failed to download file.');
        }
    }
    return(
        <div>
            <h2>  Files </h2>
            <input  type="file" ref={fileInputRef}  onChange={(e) =>{setFiles(e.target.files[0])}}/>

            <button onClick={handleupload} disabled={isLoading}>Upload files</button>
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
                                    <button onClick={() => handleView(ele)} style={{ marginRight: 8 }}>View</button>
                                    <button onClick={() => handleDownload(ele)} style={{ marginRight: 8 }}>Download</button>
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