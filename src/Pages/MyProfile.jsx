import { useContext } from "react"
import UserContext from "../context/userContext"
export default function MyProfile(){
    const {user} = useContext(UserContext)

    if(!user){
        return <p> loading....</p>
    }
    return(
        <div>
            <h2> Account Page</h2>
            <p> username - {user?.name}</p>
            <p> Email -{user.email}</p>
            <p> Role - {user.role}</p>
        </div>
    )
}