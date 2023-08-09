import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MovieCard} from "../movie-card/movie-card";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import "./similiar-movies.scss";

export function SimiliarMovies({removeFavorite, addToFavorite}) {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);

  const {movieID} = useParams();
  const selectedMovie = movies.find((item) => item._id === movieID);

  let similiarMovies = movies.filter((movie) => {
    return (
      movie._id !== movieID && movie.Genre.Name === selectedMovie.Genre.Name
    );
  });

  return (
    <>
      {" "}
      <Row>
        <Col className="similiar-h3">
          <h3>SimiliarMovies:</h3>
        </Col>
      </Row>
      <Row>
        {similiarMovies ? (
          similiarMovies.map((movie) => (
            <Col className="mb-3" xs={7} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard
                key={movie._id}
                movie={movie}
                removeFavorite={() => removeFavorite(movie)}
                addToFavorite={() => addToFavorite(movie)}
              />
            </Col>
          ))
        ) : (
          <p>No similiar Movies found</p>
        )}
      </Row>
    </>
  );
}

SimiliarMovies.propTypes = {
  movies: PropTypes.object,
  user: PropTypes.object,
  removeFavorite: PropTypes.func,
};
