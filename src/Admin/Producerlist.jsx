import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {listproducer} from "../slice/admin-slice"
import axios from "../config/a"
export default function Producerlist(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listproducer())
    },[])

    const {producer} = useSelector((state) =>{
        return state.Admin
    })

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
                    
                        {producer.map((ele, i)=>{
                            return(
                                <tr key = {ele._id}>
                                    <td>{i+1} </td>
                                    <td> {ele.name}</td>
                                    <td> {ele.email}</td>
                                    <td> {ele.role}</td>
                                    <td><button onClick = {()=>handleremove(ele._id)}>remove</button></td>

                                </tr>
                            )
                        })}
                
                </tbody>
                

                
            </table>
        </div>
    )
}