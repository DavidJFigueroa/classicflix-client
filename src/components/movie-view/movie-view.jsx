import React from "react";
import {Route, Link, Routes, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Card, Button, Row, Col, Container} from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({movie, onBackClick}) => {
  return (
    <Row>
      <Card>
        <Col>
          <Col>
            <Card.Img
              className="d-block mx-auto img-fluid"
              id="movie-img"
              src={movie.ImagePath}
              alt="movie-img"
            />
          </Col>
          <Col>
            <div style={{textAlign: "center"}}>
              <span>
                <b>
                  <i>Title:</i>
                </b>
              </span>
              <span>{movie.Title}</span>
            </div>
            <div style={{textAlign: "center"}}>
              <span>
                <b>
                  <i>Description:</i>
                </b>
              </span>
              <span>{movie.Description}</span>
            </div>
            <div style={{textAlign: "center"}}>
              <span>
                {" "}
                <b>
                  <i>Director:</i>
                </b>
              </span>
              <span>{movie.Director.Name}</span>
            </div>
            <div style={{textAlign: "center"}}>
              <span>
                {" "}
                <b>
                  <i>Genre:</i>
                </b>
              </span>
              <span>{movie.Genre.Name}</span>
            </div>
            <div style={{textAlign: "center"}}>
              <Button id="backbutton" onClick={onBackClick}>
                Back
              </Button>
            </div>
          </Col>
        </Col>
      </Card>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
    Description: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func,
};
