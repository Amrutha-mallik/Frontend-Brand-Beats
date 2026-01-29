import { useSelector, useDispatch } from "react-redux"
import {Link} from "react-router-dom"
import {fetchProjects} from "../slice/producer-slice"
import {useEffect, useState} from "react"
import "../Styles/browseproject.css"

const ITEMS_PER_PAGE = 9

export default function BrowseProject(){
    const[currentPage, setCurrentPage] = useState(1)

    const{projects} = useSelector((state)=>{
        return state.Producer
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProjects())
    },[])

    const startIndex = (currentPage - 1 ) * ITEMS_PER_PAGE
    const currentProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
    
    
    return(
        <div className="browse-container">
            <h2>All Projects - {projects.length}</h2>
            <div className="project-grid">
            {currentProjects.map((ele)=>(
                <div key={ele._id} className="project-card"> 
                    <h3> Title: {ele.title}</h3>
                    <h3> Brand :{ele.brandId?.name}</h3>
                    
                    <Link to={`/producer/projectview/${ele._id}`}>View</Link>
                </div>
            ))}
        </div>

        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        </div>
        </div>
    )
}