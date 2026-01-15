import { useEffect } from "react";
import {fetchproposal} from "../slice/brand-slice"
import {useParams } from "react-router-dom"

import { useSelector, useDispatch} from "react-redux";
export default function Brand() {
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchproposal(id))

  },[id])

  const {proposal} = useSelector((state)=>{
    return state.Brand
  })

  const assignProposal = proposal.filter(p => p.status == "Accepted")
  

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3>Welcome to Brand Dashboard</h3>
        <p>Manage your projects and campaigns here.</p>
        <br/>

        {assignProposal .length == 0  ? ( <p> No assigned producer yet </p>) :(
          <table border = "1"> 
          <thead>
            <tr>
              <th> TITLE</th>
              <th> ASSIGNED PRODUCER</th>
              <th> STATUS </th>
            </tr>
          </thead>
          <tbody>
          {assignProposal.map((ele)=>{
            return(
              <tr>
                <td> {ele.projectId?.title}</td>
                <td> {ele.producerId.name}</td>
                <td> {ele.status}</td>
              </tr>
            )
          })}
          </tbody>

          </table>
        )}
      </div>
    </div>
  );
}

// export default function Brand() {
//   return (
//     <>
//       <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
//         Brand Dashboard
//       </h2>

//       {/* Stat Cards */}
//       <div style={cardGrid}>
//         <StatCard title="Active Projects" value="5" />
//         <StatCard title="Pending Feedback" value="3" />
//         <StatCard title="Total Spend" value="₹5,000" />
//         <StatCard title="Monthly Spend" value="₹1,200" />
//       </div>

//       {/* Chart + Top Producers */}
//       <div style={grid2}>
//         <div style={box}>📈 Monthly Spend Chart (add Recharts later)</div>
//         <div style={box}>
//           <h4>Top Producers</h4>
//           <ul>
//             <li>John Doe</li>
//             <li>Jane Smith</li>
//             <li>Sarah Lee</li>
//           </ul>
//         </div>
//       </div>

//       {/* Table */}
//       <div style={box}>
//         <h4>Projects in Progress</h4>
//         <table style={table}>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Status</th>
//               <th>Producer</th>
//               <th>Deadline</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Summer Campaign</td>
//               <td>Under review</td>
//               <td>Sanrmacher</td>
//               <td>Jan 11</td>
//             </tr>
//             <tr>
//               <td>Holiday Sale</td>
//               <td>In Progress</td>
//               <td>Jane</td>
//               <td>Jul 26</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div style={statCard}>
//       <p style={{ color: "#64748b", fontSize: 14 }}>{title}</p>
//       <h3 style={{ fontSize: 26 }}>{value}</h3>
//     </div>
//   );
// }

// const cardGrid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(4, 1fr)",
//   gap: 20,
//   marginBottom: 30
// };

// const statCard = {
//   background: "#ffffff",
//   borderRadius: 12,
//   padding: 20,
//   border: "1px solid #e5e7eb"
// };

// const grid2 = {
//   display: "grid",
//   gridTemplateColumns: "2fr 1fr",
//   gap: 20,
//   marginBottom: 30
// };

// const box = {
//   background: "#ffffff",
//   borderRadius: 12,
//   padding: 20,
//   border: "1px solid #e5e7eb"
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse"
// };
