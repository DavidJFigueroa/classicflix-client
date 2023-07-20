import {useState, useEffect} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-database-api-9ba401fe0e70.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <Row>
      <>
        {" "}
        {!user ? (
          <>
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />

              <SignupView />
            </Col>
          </>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            <>
              {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) =>
                      setSelectedMovie(newSelectedMovie)
                    }
                  />
                </Col>
              ))}
            </>
            <Row>
              <Col style={{textAlign: "center"}}>
                <Button
                  variant="primary"
                  id="logoutbutton"
                  onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}>
                  Logout
                </Button>
              </Col>
            </Row>
          </>
        )}
      </>
    </Row>
  );
};
