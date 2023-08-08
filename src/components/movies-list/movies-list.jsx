import React from "react";
import {useSelector} from "react-redux";
import {MovieCard} from "../movie-card/movie-card";
import {MoviesFilter} from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./movies-list.scss";

export const MoviesList = ({addToFavorite, removeFavorite}) => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter).toLowerCase();

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );
  return (
    <>
      <Row className="list-row">
        <MoviesFilter />
      </Row>
      <Row className="list-row">
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-5" xs={7} sm={6} md={4} lg={3} key={movie._id}>
              <MovieCard movie={movie} addToFavorite={addToFavorite} removeFavorite={removeFavorite} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
