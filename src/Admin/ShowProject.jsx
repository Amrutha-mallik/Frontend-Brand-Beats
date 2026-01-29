import { useSelector, useDispatch } from "react-redux"
import {fetchProjects} from "../slice/producer-slice"
import axios from "../config/a"
import {useEffect, useState} from "react"

const ITEMS_PER_PAGE = 10
export default function ShowProject(){
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const{projects} = useSelector((state)=>{
        return state.Producer
    })
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProjects())
    },[])

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    const filteredProjects = projects.filter((ele) =>
        ele.title.toLowerCase().includes(search.toLowerCase()) ||
        ele.brandId?.name.toLowerCase().includes(search.toLowerCase()))

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

        const paginatedProjects = filteredProjects.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        )

        const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)

    const handleremove = async( id) =>{
        console.log("id", id)
        const userconform = window.confirm("Are you sure?")
        if(userconform){
            try{
                const response =  await axios.delete(`/projectremove/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
                console.log(response.data)
                dispatch(fetchProjects())

            }
            catch(err){
                console.log(err)
            }
        }
        

    }
    return(
        <div >
            <h2  > All Project  -{projects.length}</h2>
            <input type="text" placeholder="Search by project " value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
                padding: "8px 12px",
                marginBottom: "12px",
                width: "280px",
                borderRadius: "6px",
                border: "1px solid #ccc"
                }}/>
            <table border = "1">
                <thead>
                <tr>
                    <th> #</th>
                    <th>Title</th>
                    <th> Brand Name</th>
                    <th> Status</th>
                    <th> Action</th>
                    <th></th>
                </tr>
                </thead>
               
                <tbody>
                    {paginatedProjects.map((ele, i)=>{
                        return(
                            <tr key ={ele._id}>
                            <td> { i + 1 }</td>
                            <td> {ele.title}</td>
                            <td >{ele.brandId ? ele.brandId.name : "—"}</td>
                            <td>{ele.status}</td>
                            <td> <button onClick={ ()=>handleremove( ele._id)}> Remove</button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            {filteredProjects.length > ITEMS_PER_PAGE && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "20px"
                    }}>
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "6px",
                            border: "none",
                            background: "#0b87c1",
                            color: "white",
                            cursor: "pointer",
                            opacity: currentPage === 1 ? 0.5 : 1}}> Prev </button>
                            <span style={{ fontWeight: "600", color: "#555" }}> Page {currentPage} of {totalPages}</span>
                            <button 
                            disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
                            style={{
                                padding: "8px 14px",
                                borderRadius: "6px",
                                border: "none",
                                background: "#0b87c1",
                                color: "white",
                                cursor: "pointer",
                                opacity: currentPage === totalPages ? 0.5 : 1}}> Next</button>
                    </div>
            )}
  
        </div>
    )
}