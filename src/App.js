import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Navbar } from "react-bootstrap";

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
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand href="#home">XSS ITLAW</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {token && (
              <>
                {email}&nbsp;-&nbsp;
                <a href="#" onClick={logout}>
                  Logout
                </a>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <div className="App">
          {token !== null ? (
            <HomePage email={email} token={token} />
          ) : (
            <AuthPage success={success} />
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
