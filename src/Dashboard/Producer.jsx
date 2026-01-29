import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../context/userContext"
import {myproposal} from "../slice/brand-slice"


export default function Producer() {
  
  const {user } = useContext(UserContext)
  const dispatch = useDispatch()
  const {proposal} = useSelector((state)=>{
    return state.Brand
  })

   useEffect(()=>{
      dispatch(myproposal())
    },[])


  return (
    <div>

      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3> {user?.name} Welcome to  Dashboard</h3>
        <p>Browse and submit proposals for projects.</p>
        <br/>
        <br/>

        <table border = "1">
          <thead>
             <tr>
              <th>#</th>
            <th>Project Name</th>
            <th>Brand Email</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
            {proposal.map((ele, i)=>{
              return(
                <tr>
                  <td> {i+1}</td>
                  <td>{ele.projectId.title}</td>
                  <td> {ele.projectId.email}</td>
                  <td>{ele.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}