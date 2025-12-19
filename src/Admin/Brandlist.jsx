import {listbrand} from "../slice/admin-slice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "../config/a"

export default function Brandlist(){

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
                    {brand.map((ele, i)=>{
                        return(
                            <tr key = {ele._id}>
                                <td>{i+1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>{ele.role}</td>

                                <td><button onClick = {()=>handleremove(ele._id)}>remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}