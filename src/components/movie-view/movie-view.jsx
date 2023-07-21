import React from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
// import PropTypes from "prop-types";
import {Card, Button, Row, Col, Container} from "react-bootstrap";

import "./movie-view.scss";

export const MovieView = ({movies}) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <Card>
            <Col>
              <Card.Img
                className="d-block mx-auto"
                id="movie-img"
                src={movie.ImagePath}
                alt="movie-img"
              />
            </Col>
            <Col>
              <div style={{textAlign: "center"}}>
                <span>
                  <b>
                    <i>Title: </i>
                  </b>
                </span>
                <span>{movie.Title}</span>
              </div>
              <div id="div-description" style={{textAlign: "center"}}>
                <span>
                  <b>
                    <i>Description: </i>
                  </b>
                </span>
                <span>{movie.Description}</span>
              </div>
              <div style={{textAlign: "center"}}>
                <span>
                  {" "}
                  <b>
                    <i>Director: </i>
                  </b>
                </span>
                <span>{movie.Director.Name}</span>
              </div>
              <div style={{textAlign: "center"}}>
                <span>
                  {" "}
                  <b>
                    <i>Genre: </i>
                  </b>
                </span>
                <span>{movie.Genre.Name}</span>
              </div>
              <div style={{textAlign: "center"}}>
                <Link to={"/"}>
                  <Button id="backbutton">Back</Button>
                </Link>
              </div>
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string,
//     ImagePath: PropTypes.string,
//     Description: PropTypes.string,
//     Director: PropTypes.shape({
//       Name: PropTypes.string,
//       Description: PropTypes.string,
//     }),
//     Genre: PropTypes.shape({
//       Name: PropTypes.string,
//       Description: PropTypes.string,
//     }),
//   }),
// };
