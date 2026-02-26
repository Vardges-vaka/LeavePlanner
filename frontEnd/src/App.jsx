import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PublicRoutes } from "./06_routes/_routes.index.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* // ! Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
