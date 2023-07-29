import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {Link} from "react-router-dom";
import "./nav-bar.scss";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "../../redux/reducers/user";

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          bg="light"
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              Classic Flix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              backdrop={false}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {!user && (
                    <>
                      <Nav.Link as={Link} to="/login">
                        Login
                      </Nav.Link>
                      <Nav.Link as={Link} to="/signup">
                        Signup
                      </Nav.Link>
                    </>
                  )}

                  {user && (
                    <>
                      <Nav.Link as={Link} to="/">
                        Home
                      </Nav.Link>
                      <Nav.Link as={Link} to="/users">
                        My Profile
                      </Nav.Link>
                      <Nav.Link onClick={() => dispatch(setUser(null))}>
                        Logout
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};
