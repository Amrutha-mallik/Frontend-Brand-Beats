import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {pendingbrands, approvebrand, rejectbrands} from "../slice/admin-slice"
const ITEMS_PER_PAGE = 3


export default function PendingBrands(){
    const [currentPage, setCurrentPage] = useState(1)
    const {pendingBrands}= useSelector((state)=>{
        return state.Admin
    })
    const dispatch= useDispatch()
    const {id} = useParams()

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const paginatedBrand = pendingBrands.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        )
        const totalPages = Math.ceil(pendingBrands.length / ITEMS_PER_PAGE)

    useEffect(()=>{
        dispatch(pendingbrands())
    },[])
    return(
        <div>
            <h2>pending approval - {pendingBrands.length}</h2>
            {paginatedBrand.map((ele)=>{
                return(
                    <div key={ele._id}>
                    <p><b>Brand Name- </b> {ele.name}</p>
                    <p><b>Brand Email </b>- {ele.email}</p>
                    <p> <b>Description </b> - {ele.businessDescription}</p>
                    <p> <b>Approved </b>- {ele.isApproved ? "Yes" : "No"}</p>
                    <button onClick={()=> dispatch(approvebrand(ele._id))} style ={{backgroundColor: ele.isApproved ? "green" : "blue"}}> {ele.isApproved ? "Approved" : "Approve"}</button>
                    <button onClick = {()=> dispatch(rejectbrands(ele._id))} style ={{backgroundColor: "red"}}> Reject</button>
                    <br/>
                    <br/>
                    <br/>
                    
                    </div>
                )
            })}
            {pendingBrands.length > ITEMS_PER_PAGE && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginTop: "24px"
          }}>
            
            <button disabled={currentPage === 1}onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#0b87c1",
              color: "white",
              cursor: "pointer",
              opacity: currentPage === 1 ? 0.5 : 1
            }}>Prev </button>
            <span style={{ fontWeight: "600", color: "#555" }}> Page {currentPage} of {totalPages} </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#0b87c1",
              color: "white",
              cursor: "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1
            }}>Next</button>
        </div>
      )}
        </div>
    )
}