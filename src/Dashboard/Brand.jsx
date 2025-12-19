import Header from "../component/Header";

export default function Brand() {
  return (
    <div>
      <Header title="Brand Dashboard" />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3>Welcome to Brand Dashboard</h3>
        <p>Manage your projects and campaigns here.</p>
      </div>
    </div>
  );
}