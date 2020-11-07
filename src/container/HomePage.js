import React, { useState, useEffect } from "react";

const API_KEY = "AIzaSyACOFYf547Q740K76SfhiLgoMVq7_9ibrs";
const DATABASE_URL = `https://xss-test-a187e.firebaseio.com/messages.json`;

const HomePage = (props) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const submitHandler = async () => {
    const res = await fetch(DATABASE_URL, {
      method: "POST",
      body: JSON.stringify({
        msg: msg,
        email: props.email,
      }),
    });
    fetchData();
  };

  const fetchData = async () => {
    const res = await fetch(DATABASE_URL, {
      method: "GET",
    });

    const data = await res.json();

    const arr = [];

    for (let i in data) {
      arr.push({
        by: data[i].email,
        text: data[i].msg,
      });
    }

    setMessages(arr);

    console.log(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMsg = (text) => {
    return {
      __html: text,
    };
  };

  return (
    <div>
      <h1>HOME PAGE</h1>

      {messages.map((item) => (
        <div key={item.text}>
          <p>
            {item.by} : <span dangerouslySetInnerHTML={renderMsg(item.text)} />
          </p>
        </div>
      ))}

      <div>
        <input
          value={msg}
          onChange={(e) => setMsg(e.currentTarget.value)}
        ></input>
      </div>

      <button onClick={submitHandler}>SUBMIT</button>

      <button onClick={props.logout}>LOGOUT</button>
    </div>
  );
};

export default HomePage;
