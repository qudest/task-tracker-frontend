import 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import PropTypes from "prop-types";

function TaskModal({
                       show,
                       onHide,
                       selectedTask,
                       updateTaskField,
                       toggleTaskCompleted,
                       deleteTask
                   }) {
    if (!selectedTask) {
        return null;
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={selectedTask.title || ''}
                        onChange={(e) => updateTaskField('title', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={selectedTask.description || ''}
                        onChange={(e) => updateTaskField('description', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Completed"
                        checked={selectedTask.completed}
                        onChange={toggleTaskCompleted}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteTask}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

TaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    selectedTask: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool
    }),
    updateTaskField: PropTypes.func.isRequired,
    toggleTaskCompleted: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

export default TaskModal;