import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import "./movie-card.scss";

export const MovieCard = ({movie, removeFavorite, addToFavorite}) => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
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
                onClick={() => removeFavorite(movie)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
              </Button>
            ) : (
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => addToFavorite(movie)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
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
  }),
  removeFavorite: PropTypes.func,
  addToFavorite: PropTypes.func,
};
