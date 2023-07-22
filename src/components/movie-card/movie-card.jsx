import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import "./movie-card.scss";
import {Link} from "react-router-dom";

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

  const removeFavorite = (event) => {
    event.preventDefault();

    fetch(
      `https://myflix-database-api-9ba401fe0e70.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Removed from favorites");
          response.json();
          window.location.reload();
        } else {
          alert("Could not be removed");
        }
      })
      .then((user) => {
        setUser(user);
        setIsFavorite(false);
      });
  };

  return (
    <Card className="h-100">
      <div style={{textAlign: "center"}}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </div>
      <div style={{textAlign: "center"}}>
        <Card.Body>
          <div>
            {user.FavoriteMovies.includes(movie._id) ? (
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={removeFavorite}
                outline
                floating>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-dash"
                  viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
              </Button>
            ) : (
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={addToFavorite}
                outline
                floating>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </Button>
            )}
          </div>

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
