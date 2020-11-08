import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";

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
      <h2>Submit Your Message</h2>
      <Form.Control
        as="textarea"
        rows={3}
        value={msg}
        onChange={(e) => setMsg(e.currentTarget.value)}
      />
      <br />
      <Button variant="primary" block onClick={submitHandler}>
        Submit
      </Button>

      <hr />

      <h2>Message List</h2>

      {messages.map((item) => (
        <Card key={item.text} className="mb-4">
          <Card.Body>
            <span dangerouslySetInnerHTML={renderMsg(item.text)} />
            <div class="text-right text-muted">Submitted by - {item.by}</div>
          </Card.Body>
        </Card>
      ))}

      <button onClick={props.logout}>LOGOUT</button>
    </div>
  );
};

export default HomePage;
