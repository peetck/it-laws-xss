import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const API_KEY = "AIzaSyACOFYf547Q740K76SfhiLgoMVq7_9ibrs";

const AuthPage = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchMode = () => {
    setIsLogin((prev) => !prev);
  };

  const authHandler = async () => {
    let url;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }

    const res = await fetch(url, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    const data = await res.json();

    if (!data.error) {
      props.success(data.idToken, data.email);
    }
  };

  return (
    <div class="text-center">
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <Row>
        <Col></Col>
        <Col>
          <Form.Label className="mt-3">E-Mail</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            variant="primary"
            onClick={authHandler}
            block
            className="mt-3"
          >
            {isLogin ? "Login" : "Signup"}
          </Button>
          <br />
          or&nbsp;
          <a href="#" onClick={switchMode}>
            {isLogin ? "Signup" : "Login"}
          </a>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default AuthPage;
