import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import "./movie-card.scss";
import {Link} from "react-router-dom";
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import {useState, useEffect} from "react";

export const MovieCard = ({movie, user, setUser, token}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorite = (event) => {
    event.preventDefault();

    fetch(
      `https://myflix-database-api-9ba401fe0e70.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Added to favorites");
          response.json();
          window.location.reload();
        } else {
          alert("Could not be added");
        }
      })
      .then((user) => {
        setUser(user);
        setIsFavorite((isFavorite) => !isFavorite);
      });
  };

  return (
    <Card className="h-100">
      <div style={{textAlign: "center"}}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </div>
      <div style={{textAlign: "center"}}>
        <Card.Body>
          <MDBBtn
            onClick={addToFavorite}
            className="mx-2"
            tag="a"
            color="success"
            outline
            floating>
            <MDBIcon fas icon="star" />{" "}
          </MDBBtn>

          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>

          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};
