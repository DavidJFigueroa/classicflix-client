import {Link} from "react-router-dom";
import {useParams} from "react-router";
import PropTypes from "prop-types";
import {Card, Button, Row, Col, Container} from "react-bootstrap";
import {useSelector} from "react-redux";

import "./movie-view.scss";
import "../../index.scss";

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.list);
  const {movieID} = useParams();
  const movie = movies.find((m) => m._id === movieID);

  return (
    <Container>
      <Row>
        <Col>
          <Card.Img
            // className="d-block mx-auto"
            id="movie-img"
            src={movie.ImagePath}
            alt="movie-img"
          />
          <div>
            <h1>{movie.Title}</h1>
          </div>
          <div>
            <h3>{movie.Director.Name}</h3>
          </div>
          <div>
            <b>{movie.Genre.Name}</b>
          </div>
          <div id="div-description">
            <span>{movie.Description}</span>
          </div>
          <div>
            <Link to={"/"}>
              <Button id="backbutton">Back</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
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
  }),
};
