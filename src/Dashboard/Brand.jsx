import { useEffect, useContext } from "react";
import {fetchproposal} from "../slice/brand-slice"
import {useParams } from "react-router-dom"
import UserContext from "../context/userContext";
import { useSelector, useDispatch} from "react-redux";


export default function Brand() {
   const {user } = useContext(UserContext)
       const isApproved = user?.isApproved

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
       
      </div>
    </div>
  );
}

