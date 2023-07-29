import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MovieCard} from "../movie-card/movie-card";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

export function FavoriteMovies({user, removeFavorite}) {
  const movies = useSelector((state) => state.movies.list);
  const result = movies.filter((m) => {
    return user.FavoriteMovies.includes(m._id);
  });

  return (
    <>
      {" "}
      <Row>
        <Col>
          <h3>Favorite Movies:</h3>
        </Col>
      </Row>
      <Row>
        {result.map((movie) => (
          <Col className="mb-3" xs={7} sm={6} md={4} lg={3} key={movie._id}>
            <MovieCard
              key={movie._id}
              movie={movie}
              user={user}
              removeFavorite={() => removeFavorite(movie)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

FavoriteMovies.propTypes = {
  movies: PropTypes.object,
  user: PropTypes.object,
  removeFavorite: PropTypes.func,
};
