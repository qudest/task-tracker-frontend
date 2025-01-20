import 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {useState} from "react";
import PropTypes from "prop-types";

function RegisterModal({
                           show,
                           onHide,
                           registerEmail,
                           registerPassword,
                           registerPassword2,
                           registerError,
                           setRegisterEmail,
                           setRegisterPassword,
                           setRegisterPassword2,
                           handleRegister
                       }) {
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (registerPassword !== registerPassword2) {
            setPasswordError('Passwords don\'t match');
            return;
        }

        setPasswordError('');
        handleRegister();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {registerError && <p style={{color: 'red'}}>{registerError}</p>}
                {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email <span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control
                            type="email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password <span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control
                            type="password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            minLength="8"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm password <span style={{color: 'red'}}>*</span></Form.Label>
                        <Form.Control
                            type="password"
                            value={registerPassword2}
                            onChange={(e) => setRegisterPassword2(e.target.value)}
                            minLength="8"
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

RegisterModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    registerEmail: PropTypes.string.isRequired,
    registerPassword: PropTypes.string.isRequired,
    registerPassword2: PropTypes.string.isRequired,
    registerError: PropTypes.string,
    setRegisterEmail: PropTypes.func.isRequired,
    setRegisterPassword: PropTypes.func.isRequired,
    setRegisterPassword2: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired,
};

export default RegisterModal;