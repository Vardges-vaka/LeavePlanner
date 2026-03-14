import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider, UserProvider } from "./01_context/_context.index.js";
import { PublicRoutes } from "./06_routes/_routes.index.js";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <Routes>
            {/* // ! Public Routes */}
            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
