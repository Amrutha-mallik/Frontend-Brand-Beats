import { useSelector, useDispatch } from "react-redux"
import {fetchProjects} from "../slice/producer-slice"
import axios from "../config/a"
import {useEffect} from "react"



export default function ShowProject(){

    const{projects} = useSelector((state)=>{
        return state.Producer
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProjects())
    },[])

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
            <table border = "1">
                <thead>
                <tr>
                    <th> #</th>
                    <th>Title</th>
                    <th> Brand Name</th>
                    <th></th>
                </tr>
                </thead>
               
                <tbody>
                    {projects.map((ele, i)=>{
                        return(
                            <tr key ={ele._id}>
                            <td> { i + 1 }</td>
                            <td> {ele.title}</td>
                            <td >{ele.brandId ? ele.brandId.name : "—"}</td>
                            <td> <button onClick={ ()=>handleremove( ele._id)}> remove</button></td>
                            </tr>
                        )
                    })}

                </tbody>

                

            </table>
           
        </div>
    )
}