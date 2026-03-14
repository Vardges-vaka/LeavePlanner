import { useState, useCallback } from "react";
import { useUserContext } from "../01_context/_context.index.js";
import "./test.css";

const API_BASE = "/api/users";

const postJSON = async (endpoint, payload) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ payload }),
  });
  return res.json();
};

const Test = () => {
  const { user, loading: authLoading, setUser, refreshUser, clearUser } =
    useUserContext();

  // -- Local UI state
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // -- SignUp form
  const [signUpData, setSignUpData] = useState({
    accessCode: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    rememberMe: false,
  });

  // -- LogIn form
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // -- Create form
  const [createData, setCreateData] = useState({
    assignedEmail: "",
    targetRole: "admin",
  });

  const handleRequest = useCallback(
    async (label, fn) => {
      setLoading(true);
      setResponse(null);
      try {
        const data = await fn();
        setResponse({ label, ...data });

        if (data.success && data.data?.user) {
          setUser(data.data.user);
        }
        if (label === "LogOut" && data.success) {
          clearUser();
        }
      } catch (err) {
        setResponse({ label, success: false, message: err.message });
      } finally {
        setLoading(false);
      }
    },
    [setUser, clearUser],
  );

  // -- Handlers
  const handleSignUp = () =>
    handleRequest("SignUp", () => postJSON("/signup", signUpData));

  const handleLogIn = () =>
    handleRequest("LogIn", () => postJSON("/login", logInData));

  const handleLogOut = () =>
    handleRequest("LogOut", async () => {
      const res = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
      return res.json();
    });

  const handleCreate = () =>
    handleRequest("CreateUser", () => postJSON("/create", createData));

  // -- Helpers for controlled inputs
  const updateSignUp = (field, value) =>
    setSignUpData((prev) => ({ ...prev, [field]: value }));

  const updateLogIn = (field, value) =>
    setLogInData((prev) => ({ ...prev, [field]: value }));

  const updateCreate = (field, value) =>
    setCreateData((prev) => ({ ...prev, [field]: value }));

  if (authLoading) {
    return <div className="testPage">Checking authentication...</div>;
  }

  return (
    <div className="testPage">
      <h1 className="testPage__title">Auth API Test Panel</h1>

      {/* Auth status banner */}
      <div
        className={`testPage__status ${
          user
            ? "testPage__status--loggedIn"
            : "testPage__status--loggedOut"
        }`}
      >
        {user
          ? `Logged in as: ${user.firstName} ${user.lastName} (${user.role})`
          : "Not logged in"}
      </div>

      <div className="testPage__grid">
        {/* -- SignUp Card -- */}
        <div className="testPage__card">
          <h2 className="testPage__cardTitle">Sign Up</h2>

          <div className="testPage__field">
            <label className="testPage__label">Access Code</label>
            <input
              className="testPage__input"
              type="text"
              value={signUpData.accessCode}
              onChange={(e) => updateSignUp("accessCode", e.target.value)}
              placeholder="Paste access code"
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">Email</label>
            <input
              className="testPage__input"
              type="email"
              value={signUpData.email}
              onChange={(e) => updateSignUp("email", e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">Password</label>
            <input
              className="testPage__input"
              type="password"
              value={signUpData.password}
              onChange={(e) => updateSignUp("password", e.target.value)}
              placeholder="Min 8 characters"
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">First Name</label>
            <input
              className="testPage__input"
              type="text"
              value={signUpData.firstName}
              onChange={(e) => updateSignUp("firstName", e.target.value)}
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">Last Name</label>
            <input
              className="testPage__input"
              type="text"
              value={signUpData.lastName}
              onChange={(e) => updateSignUp("lastName", e.target.value)}
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">Date of Birth</label>
            <input
              className="testPage__input"
              type="date"
              value={signUpData.dob}
              onChange={(e) => updateSignUp("dob", e.target.value)}
            />
          </div>

          <label className="testPage__checkbox">
            <input
              type="checkbox"
              checked={signUpData.rememberMe}
              onChange={(e) => updateSignUp("rememberMe", e.target.checked)}
            />
            Remember me (100 days)
          </label>

          <button
            className="testPage__btn testPage__btn--signup"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "..." : "Sign Up"}
          </button>
        </div>

        {/* -- LogIn Card -- */}
        <div className="testPage__card">
          <h2 className="testPage__cardTitle">Log In</h2>

          <div className="testPage__field">
            <label className="testPage__label">Email</label>
            <input
              className="testPage__input"
              type="email"
              value={logInData.email}
              onChange={(e) => updateLogIn("email", e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">Password</label>
            <input
              className="testPage__input"
              type="password"
              value={logInData.password}
              onChange={(e) => updateLogIn("password", e.target.value)}
            />
          </div>

          <label className="testPage__checkbox">
            <input
              type="checkbox"
              checked={logInData.rememberMe}
              onChange={(e) => updateLogIn("rememberMe", e.target.checked)}
            />
            Remember me (100 days)
          </label>

          <button
            className="testPage__btn testPage__btn--login"
            onClick={handleLogIn}
            disabled={loading}
          >
            {loading ? "..." : "Log In"}
          </button>

          <div style={{ marginTop: "1rem" }}>
            <button
              className="testPage__btn testPage__btn--logout"
              onClick={handleLogOut}
              disabled={loading || !user}
            >
              {loading ? "..." : "Log Out"}
            </button>
          </div>
        </div>

        {/* -- Create User/Admin Card -- */}
        <div className="testPage__card">
          <h2 className="testPage__cardTitle">
            Create Admin / User (requires auth)
          </h2>

          <div className="testPage__field">
            <label className="testPage__label">Assigned Email</label>
            <input
              className="testPage__input"
              type="email"
              value={createData.assignedEmail}
              onChange={(e) => updateCreate("assignedEmail", e.target.value)}
              placeholder="newadmin@example.com"
            />
          </div>

          <div className="testPage__field">
            <label className="testPage__label">Target Role</label>
            <select
              className="testPage__select"
              value={createData.targetRole}
              onChange={(e) => updateCreate("targetRole", e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            className="testPage__btn testPage__btn--create"
            onClick={handleCreate}
            disabled={loading || !user}
          >
            {loading ? "..." : "Generate Access Code"}
          </button>
        </div>
      </div>

      {/* -- Response Display -- */}
      {response && (
        <div className="testPage__response">
          <h3 className="testPage__responseTitle">
            Response: {response.label}{" "}
            {response.success ? "✅" : "❌"}
          </h3>
          <pre className="testPage__responsePre">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Test;
