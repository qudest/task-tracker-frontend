import 'react';
import {Navbar, Nav, Button, Container} from 'react-bootstrap';
import PropTypes from 'prop-types';

function NavbarComp({isAuthenticated, currentUserEmail, onShowRegister, onShowLogin, onLogout}) {
    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand>Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="me-3">{currentUserEmail}</Navbar.Text>
                                <Button variant="outline-danger" onClick={onLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline-success"
                                    className="me-2 mb-2 mb-lg-0 mt-2 mt-lg-0 w-100 w-lg-auto"
                                    onClick={onShowLogin}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    className="mb-2 mb-lg-0 w-100 w-lg-auto"
                                    onClick={onShowRegister}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

NavbarComp.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    currentUserEmail: PropTypes.string.isRequired,
    onShowRegister: PropTypes.func.isRequired,
    onShowLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default NavbarComp;