import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import "./movie-card.scss";
import {Link} from "react-router-dom";

export const MovieCard = ({movie}) => {
  return (
    <Card className="h-100">
      <div style={{textAlign: "center"}}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </div>
      <div style={{textAlign: "center"}}>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Link to={"/movies/${encodeURIComponent(movie._id)}"}>
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
