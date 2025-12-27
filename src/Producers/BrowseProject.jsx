import { useSelector, useDispatch } from "react-redux"
import {Link} from "react-router-dom"
import {fetchProjects} from "../slice/producer-slice"
import {useEffect} from "react"
import "../Styles/browseproject.css"

export default function BrowseProject(){

    const{projects} = useSelector((state)=>{
        return state.Producer
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProjects())
    },[])
    
    return(
        <div className="browse-container">
            <h2>All Projects - {projects.length}</h2>
            {projects.map((ele)=>(
                <div key={ele._id} className="project-card"> 
                    <h3> Title: {ele.title}</h3>
                    <h3> Brand :{ele.brandId?.name}</h3>
                    
                    <Link to={`/projectview/${ele._id}`}>View</Link>
                </div>
            ))}
        </div>
    )
}