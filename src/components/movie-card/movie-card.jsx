import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}>
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: "...",
      Description: "...",
    }),
    Genre: PropTypes.shape({
      Name: "...",
      Description: "...",
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
