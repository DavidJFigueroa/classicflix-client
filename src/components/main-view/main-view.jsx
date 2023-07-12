import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "North By Northwest",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Northbynorthwest1.jpg/440px-Northbynorthwest1.jpg",
      author: "Alfred Hitchcock",
      genre: "Thriller",
    },
    {
      id: 2,
      title: "Psycho",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Psycho_%281960%29_theatrical_poster_%28retouched%29.jpg/440px-Psycho_%281960%29_theatrical_poster_%28retouched%29.jpg",
      author: "Alfred Hitchcock",
      genre: "Horror",
    },
    {
      id: 3,
      title: "Vertigo",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vertigomovie_restoration.jpg/440px-Vertigomovie_restoration.jpg",
      author: "Alfred Hitchcock",
      genre: "Thriller",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genre={movie.genre}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
    </div>
  );
};
