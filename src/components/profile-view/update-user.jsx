import React from "react";
import {Button, Form, Row, Container, Card, Col} from "react-bootstrap";

export function UpdateUser({handleSubmitUpdate, user}) {
  return (
    <Card>
      <Card.Body>
        <Card.Title> Update your info</Card.Title>

        <Form onSubmit={handleSubmitUpdate}>
          <Row>
            <Col>
              <Form.Group controlId="formUsername">
                <Form.Label>
                  Username:
                  <Form.Control
                    type="text"
                    value={user.Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                  />
                </Form.Label>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group controlId="formPassword">
                <Form.Label>
                  Password:
                  <Form.Control
                    type="password"
                    value={user.Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="formEmail">
                <Form.Label>
                  Email:
                  <Form.Control
                    type="email"
                    value={user.Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Label>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBirthday">
                <Form.Label>
                  Birthday:
                  <Form.Control
                    type="date"
                    value={user.Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
