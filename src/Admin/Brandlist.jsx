import {listbrand} from "../slice/admin-slice"
import { useEffect , useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "../config/a"
const ITEMS_PER_PAGE = 10

export default function Brandlist(){
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const {brand, isLoading}  =  useSelector((state)=>{
        return state.Admin
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listbrand())
    },[])

     if (isLoading) {
    return <h3>Loading brands...</h3>
  }

  const filteredBrands = brand.filter((ele) =>
        ele.name.toLowerCase().includes(search.toLowerCase()))

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

        const paginatedBrand = filteredBrands.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        )
        const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE)


  const handleremove = async(id) =>{
    console.log("id", id)
    const userconform = window.confirm("Are you sure")
    if(userconform){
        try{
            const response = await axios.delete(`/users/${id}`, {headers:{Authorization:localStorage.getItem("token")}})
            console.log(response.data)
            dispatch(listbrand())
        } catch(err){
            console.log(err)
        }
    }
    
    
  }

    return(
        <div>
            <h2> Brand List</h2>
            <input 
            type="text"
            placeholder="Search by brand name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
                padding: "8px 12px",
                marginBottom: "12px",
                width: "250px",
                borderRadius: "6px",
                border: "1px solid #ccc"
                }}/>
            <table border = "1">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Approve Status</th>
                    <th>Action 1</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBrand.map((ele, i)=>{
                        return(
                            <tr key = {ele._id}>
                                <td>{i+1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>{ele.role}</td>
                                <td> {ele.isApproved ? "Approved" : "Pending"}</td>

                                <td><button onClick = {()=>handleremove(ele._id)}>Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
             {filteredBrands.length > ITEMS_PER_PAGE && (
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