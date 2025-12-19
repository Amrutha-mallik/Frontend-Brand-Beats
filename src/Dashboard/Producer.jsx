import Header from "../component/Header";

export default function Producer() {
  return (
    <div>
      <Header title="Producer Dashboard" />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3>Welcome to Producer Dashboard</h3>
        <p>Browse and submit proposals for projects.</p>
      </div>
    </div>
  );
}