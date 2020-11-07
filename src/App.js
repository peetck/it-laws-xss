import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

// import LoginPage from "./container/LoginPage";
import HomePage from "./container/HomePage";
import AuthPage from "./container/AuthPage";

function App() {
  const [token, setToken] = useState();
  const [localId, setLocalId] = useState();
  const [email, setEmail] = useState();

  const success = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
  };

  // try autologin
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <div className="App">
      {token !== null ? (
        <HomePage logout={logout} email={email} />
      ) : (
        <AuthPage success={success} />
      )}
    </div>
  );
}

export default App;
