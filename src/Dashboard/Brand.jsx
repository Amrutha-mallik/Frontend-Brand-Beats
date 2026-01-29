import { useEffect, useContext } from "react";
import {fetchbrand} from "../slice/producer-slice"
import {useParams } from "react-router-dom"
import UserContext from "../context/userContext";
import { useSelector, useDispatch} from "react-redux";


export default function Brand() {
   const {user } = useContext(UserContext)
       const isApproved = user?.isApproved

      const{projects} = useSelector((state)=>{
        return state.Producer
    })

      const dispatch = useDispatch()

      useEffect(()=>{
        dispatch(fetchbrand())
    },[])

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3>Welcome  {user?.name} </h3>
        <p>Manage your projects and campaigns here.</p>
        {!isApproved && (
            <p style={{ color: "red", marginTop: "10px", fontSize: "13px" }}>
              Your account is pending admin approval.
            </p>
          )}
        <br/>
        <table border = "1">
          <tr>
            <th> #</th>
            <th> TITLE</th>
            <th> GENRE</th>
            <th> DEADLINE</th>
            <th> BUDGET</th>
            <th> STATUS</th>
            <th> Assigned Producer</th>
          </tr>
          {projects.map((ele, i)=>{
            return(
              <tr>
                <td>{i+1}</td>
                <td>{ele.title}</td>
                <td>{ele.genre}</td>
                <td> {ele.deadline? new Date(ele.deadline).toLocaleDateString("en-GB") : "—"}</td>
                <td>{ele.budget}</td>
                <td> {ele.status}</td>
                <td>{ele.producerId?.name || "Not Assigned"}</td>
              </tr>
            )
          })}
        </table>

       
      </div>
    </div>
  );
}

