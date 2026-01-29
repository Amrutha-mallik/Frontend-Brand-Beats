import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {listproducer} from "../slice/admin-slice"
import axios from "../config/a"
const ITEMS_PER_PAGE = 10

export default function Producerlist(){
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listproducer())
    },[])

    const {producer} = useSelector((state) =>{
        return state.Admin
    })
    const filteredProducers = producer.filter((ele) =>
        ele.name.toLowerCase().includes(search.toLowerCase()) )

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

        const paginatedProducer = filteredProducers.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        )   
        
        const totalPages = Math.ceil(filteredProducers.length / ITEMS_PER_PAGE)


    const handleremove =async(id)=>{
        console.log("id", id)
        const userconform = window.confirm("Are you sure")
        if(userconform){
            try{
                const response = await axios.delete(`/users/${id}`, {headers:{Authorization:localStorage.getItem("token")}})
                console.log(response.data)
                dispatch(listproducer())

            }catch(err){
                console.log(err)
            }
        }

    }

    return(
        <div>
            <h2> Producer List</h2>
            <input type="text" placeholder="Search producer by name ..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
                padding: "8px 12px",
                marginBottom: "12px",
                width: "280px",
                borderRadius: "6px",
                border: "1px solid #ccc"}}/>

            <table border = "1">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {paginatedProducer.map((ele, i)=>{
                            return(
                                <tr key = {ele._id}>
                                    <td>{i+1} </td>
                                    <td> {ele.name}</td>
                                    <td> {ele.email}</td>
                                    <td> {ele.role}</td>
                                    <td><button onClick = {()=>handleremove(ele._id)}>Remove</button></td>

                                </tr>
                            )
                        })}
                
                </tbody>
            </table>

            {filteredProducers.length > ITEMS_PER_PAGE && (
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