import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Card } from "react-bootstrap";

const HomePage = (props) => {
  const { token } = props;
  const DATABASE_URL = `https://xss-test-a187e.firebaseio.com/messages.json?auth=${token}`;
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const submitHandler = async () => {
    await fetch(DATABASE_URL, {
      method: "POST",
      body: JSON.stringify({
        msg: msg,
        email: props.email,
      }),
    });
    fetchData();
  };

  const fetchData = useCallback(async () => {
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
  }, [DATABASE_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderMsg = (text) => {
    return {
      __html: text,
    };
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <h2 class="mb-0">Leave A Message!</h2>
          <span className="text-muted">
            Logged in as <b>{props.email}</b>
          </span>
        </Card.Header>
        <Card.Body>
          <Form.Control
            className="mb-3"
            as="textarea"
            rows={3}
            value={msg}
            onChange={(e) => setMsg(e.currentTarget.value)}
          />
          <Button variant="primary" block onClick={submitHandler}>
            Submit
          </Button>
        </Card.Body>
      </Card>

      <hr />

      <h2 className="mb-3">Message Board</h2>

      {messages.map((item) => (
        <Card key={item.text} className="mb-4">
          <Card.Body>
            <span dangerouslySetInnerHTML={renderMsg(item.text)} />
            <div class="text-right text-muted">Submitted by - {item.by}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
