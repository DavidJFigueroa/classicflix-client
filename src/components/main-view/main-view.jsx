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
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
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

  const [isFavorite, setIsFavorite] = useState();

  const addToFavorite = (movie) => {
    fetch(
      `https://myflix-database-api-9ba401fe0e70.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Added to favorites");
          response.json();
        } else {
          alert("Could not be added");
        }
      })
      .then((user) => {
        setUser(user);
        setIsFavorite(true);
      });
  };

  const removeFavorite = (movie) => {
    fetch(
      `https://myflix-database-api-9ba401fe0e70.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Removed from favorites");
          response.json();
          window.location.reload();
        } else {
          alert("Could not be removed");
        }
      })
      .then((user) => {
        setUser(user);
        setIsFavorite(false);
      });
  };

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
                      onLoggedIn={(user, token) => {
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
                          movies={movies}
                          user={user}
                          setUser={setUser}
                          // token={token}
                          addToFavorite={addToFavorite}
                          removeFavorite={removeFavorite}
                          // favoriteMovie={favoriteMovie}
                          isFavorite={isFavorite}
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
