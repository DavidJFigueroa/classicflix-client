import {useState, useEffect} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";
import {NavigationBar} from "../nav-bar/nav-bar";
import {ProfileView} from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

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
    <BrowserRouter>
      <Row>
        <NavigationBar
          user={user}
          onLoggedOut={handleLogout}
          movies={movies}
          setMovies={setMovies}
        />

        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieID"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-5"
                        xs={7}
                        sm={6}
                        md={4}
                        lg={3}
                        key={movie._id}>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          user={user}
                          setUser={setUser}
                          token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                {user ? (
                  <Col>
                    <ProfileView
                      user={user}
                      setUser={setUser}
                      token={token}
                      movies={movies}
                      // favoriteMovies={favoriteMovie}
                    />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
