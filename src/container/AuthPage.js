import React, { useState } from "react";

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
    <div>
      <h1>{isLogin ? "LOGIN" : "SIGNUP"} PAGE</h1>
      <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />

      <button onClick={switchMode}>
        SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
      </button>
      <br />

      <button onClick={authHandler}>{isLogin ? "LOGIN" : "SIGNUP"}</button>
    </div>
  );
};

export default AuthPage;
