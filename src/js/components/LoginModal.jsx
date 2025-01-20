import 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import PropTypes from "prop-types";

function LoginModal({
                        show,
                        onHide,
                        loginEmail,
                        loginPassword,
                        loginError,
                        setLoginEmail,
                        setLoginPassword,
                        handleLogin
                    }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email <span style={{color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password <span style={{color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        minLength="8"
                        required
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
        </Modal.Body>
    </Modal>);
}

LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    loginEmail: PropTypes.string.isRequired,
    loginPassword: PropTypes.string.isRequired,
    loginError: PropTypes.string,
    setLoginEmail: PropTypes.func.isRequired,
    setLoginPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
};

export default LoginModal;