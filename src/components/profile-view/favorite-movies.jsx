import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {MovieCard} from "../movie-card/movie-card";

export function FavoriteMovies({movies, user, removeFavorite}) {
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
