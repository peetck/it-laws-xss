import { useState, useEffect } from "react";
import "./App.css";
import { Container, Navbar } from "react-bootstrap";

// import LoginPage from "./container/LoginPage";
import HomePage from "./container/HomePage";
import AuthPage from "./container/AuthPage";

const API_KEY = "AIzaSyACOFYf547Q740K76SfhiLgoMVq7_9ibrs";

function App() {
  const [token, setToken] = useState();
  const [email, setEmail] = useState();

  const success = async (token) => {
    localStorage.setItem("token", token);
    // fetch user email
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    );

    const user = await res.json();

    setEmail(user.users[0].email);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // try autologin
  useEffect(() => {
    if (localStorage.getItem("token")) {
      success(localStorage.getItem("token"));
    }
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
          {token ? (
            <HomePage email={email} token={token} />
          ) : (
            <AuthPage success={success} API_KEY={API_KEY} />
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
