import {useState} from "react";
import PropTypes from "prop-types";
import {UserInfo} from "./user-info";
import {FavoriteMovies} from "./favorite-movies";
import {UpdateUser} from "./update-user";
import {Row, Container, Col} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";

export const ProfileView = ({removeFavorite, handleLogout}) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const dispatch = useDispatch();

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

  const handleSubmitDeregister = () => {
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        handleLogout();
        window.location.replace("/signup");
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
          <UpdateUser
            handleSubmitUpdate={handleSubmitUpdate}
            user={user}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            setBirthday={setBirthday}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FavoriteMovies user={user} removeFavorite={removeFavorite} />
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  movies: PropTypes.object,
  user: PropTypes.object,
  token: PropTypes.object,
  removeFavorite: PropTypes.func,
  handleLogout: PropTypes.func,
};
