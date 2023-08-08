import React from "react";
import {useState} from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Row,
  Container,
  Card,
  CardGroup,
  Col,
} from "react-bootstrap";
import "./login-view.scss";

import {useDispatch} from "react-redux";
import {setUser} from "../../redux/reducers/user";
import {setToken} from "../../redux/reducers/token";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflix-database-api-9ba401fe0e70.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          dispatch(setUser(JSON.stringify(data.user)));
          dispatch(setToken(data.token));
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        alert("Something went wrong:" + error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card style={{marginTop: 100, marginBottom: 50}}>
              <Card.Body>
                <Card.Title> Please login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter a password"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" id="loginbutton">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
