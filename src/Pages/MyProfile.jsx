import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/userContext"
import EditProfile from "./EditProfile"
export default function MyProfile(){
    const[edit, setEdit] = useState(false)
    
    const {user, handleUpdateUser} = useContext(UserContext)
    if(!user){
        return <p> loading....</p>
    }
    return(
        <div>
            <h2>  My Account </h2>
            {!edit ? (
                <>
            <p> username - {user?.name}</p>
            <p> Email -{user.email}</p>
            <p> Role - {user.role}</p>
            <p>BIO - {user.bio}</p>
            {user.location && <p>Location - {user.location}</p>}
            <button onClick = {() => setEdit(true)}>Edit Profile</button> 
            </>) : (<EditProfile   
            user={user}
            updateUser={handleUpdateUser}
            setEdit={setEdit}/>)}
        </div>
    )
}