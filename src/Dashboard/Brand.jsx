import { useEffect } from "react";
import {fetchproposal} from "../slice/brand-slice"
import {useParams } from "react-router-dom"

import { useSelector, useDispatch} from "react-redux";
export default function Brand() {

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3>Welcome to Brand Dashboard</h3>
        <p>Manage your projects and campaigns here.</p>
        <br/>
        
      </div>
    </div>
  );
}

