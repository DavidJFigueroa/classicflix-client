import {useState} from "react";

import {UserInfo} from "./user-info";
import {FavoriteMovies} from "./favorite-movies";
import {UpdateUser} from "./update-user";
import {Row, Container, Col} from "react-bootstrap";

export const ProfileView = ({user, setUser, token, movies, removeFavorite}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

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

  const handleSubmitDeregister = (event, onLoggedOut) => {
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
    ).then((response) => {
      if (response.ok) {
        alert("Deregister succesful");
        window.location.replace("/signup");
        onLoggedOut();
      } else {
        alert("Deregister failed");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={6}>
          {" "}
          <UserInfo
            name={user.Username}
            email={user.Email}
            handleSubmitDeregister={handleSubmitDeregister}
          />
        </Col>
        <Col xs={12} sm={6}>
          {" "}
          <UpdateUser handleSubmitUpdate={handleSubmitUpdate} user={user} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FavoriteMovies
            movies={movies}
            user={user}
            removeFavorite={removeFavorite}
          />
        </Col>
      </Row>
    </Container>
  );
};
