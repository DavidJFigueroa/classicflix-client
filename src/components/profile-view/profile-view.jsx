import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {Button, Form, Row, Container, Card, Col} from "react-bootstrap";

export const ProfileView = ({user, setUser, token, movies}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const result = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://myflix-database-api-9ba401fe0e70.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("User info update successful");
          window.location.reload();
        } else {
          alert("User info update failed");
        }
      })
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(user);
      });
  };

  const handleSubmitDeregister = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://myflix-database-api-9ba401fe0e70.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Deregister successful");
          window.location.replace("/login");
          loggedOut();
        } else {
          alert("Deregister failed");
        }
      })
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(user);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div style={{textAlign: "center"}}>
            <span>
              <b>
                <i>User: </i>
              </b>
            </span>
            <span>{user.Username}</span>
          </div>
          <div id="div-description" style={{textAlign: "center"}}>
            <span>
              <b>
                <i>Email: </i>
              </b>
            </span>
            <span>{user.Email}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Card>
          <Card.Body>
            <Card.Title> Update your info</Card.Title>
            <Form onSubmit={handleSubmitUpdate}>
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
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Col>
          <h3>Favorite Movies:</h3>

          {result.map((movie) => (
            <Col className="mb-5" xs={7} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard key={movie._id} movie={movie} />
            </Col>
          ))}
        </Col>
      </Row>
      <Row>
        <Button variant="primary" onClick={handleSubmitDeregister}>
          Delete Account
        </Button>
      </Row>
    </Container>
  );
};
