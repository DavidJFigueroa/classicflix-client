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
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myflix-database-api-9ba401fe0e70.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.replace("/login");
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title> Please register</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>
                      Username:
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                      />
                    </Form.Label>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>
                      Password:
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Label>
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>
                      Email:
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Label>
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label>
                      Birthday:
                      <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                      />
                    </Form.Label>
                  </Form.Group>

                  <Button variant="primary" type="submit">
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

SignupView.propTypes = {
  onChange: PropTypes.func,
};
