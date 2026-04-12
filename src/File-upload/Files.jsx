import {uploadfile, fetchFilesByProjectId, deleteFileById} from "../slice/file-slice"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import axios from "../config/a"

export default function Files(props) {
    const dispatch = useDispatch()
    const fileInputRef = useRef(null)
    const [files, setFiles] = useState(null)
    const { data, isLoading } = useSelector((state) => state.Files)
    const { projectId } = useParams();

    useEffect(() => {
        dispatch(fetchFilesByProjectId(projectId))
    }, [projectId])

    const handleupload = () => {
        const selectedFile = files || (fileInputRef.current?.files?.[0]);
        if (!selectedFile) return alert("Select a file to upload");
        if (!projectId) return alert("Project ID is missing!");

        const formData = new FormData();
        formData.append("fileUrl", selectedFile);
        formData.append("projectId", projectId);
        formData.append("filename", selectedFile.name);

        dispatch(uploadfile(formData)).then(() => {
            dispatch(fetchFilesByProjectId(projectId))
        });

        setFiles(null)
        if (fileInputRef.current) fileInputRef.current.value = null;
    }

    
    const handleView = (ele) => {
        if (!ele.fileUrl) return alert("No file URL found");

        if (ele.fileType === "application/pdf") {
            const googleViewer = `https://docs.google.com/viewer?url=${encodeURIComponent(ele.fileUrl)}&embedded=true`;
            window.open(googleViewer, '_blank');
        } else {
            window.open(ele.fileUrl, '_blank');
        }
    }

    const handleDownload = (ele) => {
        if (!ele.fileUrl) return alert("No file URL found");

        const downloadUrl = ele.fileUrl.replace('/upload/', '/upload/fl_attachment/');

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = ele.filename || 'download';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    return (
        <div>
            <h2>Files</h2>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setFiles(e.target.files[0])}
            />
            <button onClick={handleupload} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload File"}
            </button>

            <h3>Uploaded Files</h3>
            {data.length === 0 ? (
                <p>No uploaded Files</p>
            ) : (
                <ul>
                    {data.map((ele) => (
                        <li key={ele._id}>
                            <strong>{ele.filename}</strong>
                            <br />
                            <span>Version: {ele.version}</span>
                            <br />
                            <button onClick={() => handleView(ele)} style={{ marginRight: 8 }}>
                                View
                            </button>
                            <button onClick={() => handleDownload(ele)} style={{ marginRight: 8 }}>
                                Download
                            </button>
                            <span style={{
                                color: ele.approvalStatus === "approved" ? "green"
                                    : ele.approvalStatus === "rejected" ? "red"
                                    : "orange"
                            }}>
                                {(ele.approvalStatus || "pending").toUpperCase()}
                            </span>
                            {ele.approvalStatus !== "approved" && (
                                <button onClick={() => {
                                    if (window.confirm("Are you sure?")) {
                                        dispatch(deleteFileById(ele._id))
                                    }
                                }}>
                                    Delete File
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}