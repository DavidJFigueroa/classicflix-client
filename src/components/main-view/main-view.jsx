import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setMovies} from "../../redux/reducers/movies";
import {setUser} from "../../redux/reducers/user";
import {setToken} from "../../redux/reducers/token";
import {MovieView} from "../movie-view/movie-view";
import {MoviesList} from "../movies-list/movies-list";
import {LoginView} from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";
import {NavigationBar} from "../nav-bar/nav-bar";
import {ProfileView} from "../profile-view/profile-view";
import {SimiliarMovies} from "../similiar-movies/similiar-movies"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
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
        dispatch(setMovies(data));
        console.log(data);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, [token]);

  const [isFavorite, setIsFavorite] = useState(false);

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
          return response.json();
        } else {
          alert("Could not be added");
        }
      })
      .then((user) => {
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
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
          return response.json();
        } else {
          alert("Could not be removed");
        }
      })
      .then((user) => {
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        setIsFavorite(false);
      });
  };

  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />

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
                    <LoginView />
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
                  <Navigate to="/signup" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView addToFavorite={addToFavorite}
                    removeFavorite={removeFavorite} />
                    <SimiliarMovies   addToFavorite={addToFavorite}
                    removeFavorite={removeFavorite} />
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
                ) : (
                  <MoviesList
                    addToFavorite={addToFavorite}
                    removeFavorite={removeFavorite}
                  />
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
                      removeFavorite={removeFavorite}
                      handleLogout={handleLogout}
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
