import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {pendingbrands, approvebrand, rejectbrands} from "../slice/admin-slice"
export default function PendingBrands(){
    const {pendingBrands}= useSelector((state)=>{
        return state.Admin
    })
    const dispatch= useDispatch()
    const {id} = useParams()

    useEffect(()=>{
        dispatch(pendingbrands())
    },[])
    return(
        <div>
            <h2>pending approval - {pendingBrands.length}</h2>
            {pendingBrands.map((ele)=>{
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
        </div>
    )
}