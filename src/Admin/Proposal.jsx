import {fetchproposal} from "../slice/brand-slice"
import { useDispatch, useSelector } from "react-redux"
import {useEffect} from "react"
export default function Proposal(){

    const dispatch = useDispatch()

    const {} = useSelector((state)=>{
        return state.Brand
    })

    
    return(
        <div>
            <h2> Proposal</h2>
        </div>
    )
}