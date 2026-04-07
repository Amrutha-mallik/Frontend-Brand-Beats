import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../context/userContext";
import { myproposal } from "../slice/brand-slice";

export default function Producer() {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();

  const { proposal } = useSelector((state) => state.Brand);

  useEffect(() => {
    dispatch(myproposal());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h3>Welcome {user?.name}</h3>

      <p> Browse and submit proposals for projects. </p>
      {proposal && proposal.length > 0 ? (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand Name</th>
              <th>Project Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {proposal.map((ele, i) => (
              <tr key={ele._id || i}>
                <td>{i + 1}</td>
                <td>{ele.projectId?.email}</td>
                <td>{ele.projectId?.title}</td>
                <td>{ele.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (

        <h4> No proposals found </h4>
      )}
    </div>
  );
}
