import {useState} from 'react';
import {Row, Col, Form, Button, ListGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';

function TaskList({
                      tasks,
                      newTaskTitle,
                      setNewTaskTitle,
                      addTask,
                      openTaskModal,
                      onToggleTaskCompletion,
                  }) {
    const [isError, setIsError] = useState(false);

    const handleAddTask = () => {
        if (newTaskTitle.trim() === '') {
            setIsError(true);
        } else {
            setIsError(false);
            addTask();
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewTaskTitle(value);
        setIsError(value.trim() === '');
    };

    const undoneTasks = tasks.filter((t) => !t.completed);
    const doneTasks = tasks.filter((t) => t.completed);

    return (
        <>
            <Row className="mb-3 px-3">
                <Col xs={12} sm={8} className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Enter the title of the task..."
                        value={newTaskTitle}
                        onChange={handleInputChange}
                        className={isError ? 'is-invalid' : ''}
                    />
                </Col>
                <Col xs={12} sm={4} className="text-end">
                    <Button variant="primary" onClick={handleAddTask} className="w-100">
                        Add
                    </Button>
                </Col>
            </Row>

            <Row className="px-3">
                <Col xs={12} md={6} className="mb-3">
                    <h5>To do</h5>
                    <ListGroup>
                        {undoneTasks.map((task) => (
                            <ListGroup.Item
                                key={task.id}
                                className="d-flex align-items-center justify-content-between"
                            >
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        flex: 1,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    onClick={() => openTaskModal(task)}
                                >
                                    {task.title || '\u00A0'}
                                </div>
                                <Form.Check
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        onToggleTaskCompletion(task, e.target.checked);
                                    }}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col xs={12} md={6}>
                    <h5>Completed</h5>
                    <ListGroup>
                        {doneTasks.map((task) => (
                            <ListGroup.Item
                                key={task.id}
                                className="d-flex align-items-center justify-content-between"
                                variant="success"
                            >
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        flex: 1,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                    onClick={() => openTaskModal(task)}
                                >
                                    {task.title || '\u00A0'}
                                </div>
                                <Form.Check
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) =>
                                        onToggleTaskCompletion(task, e.target.checked)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        completed: PropTypes.bool.isRequired,
    })).isRequired,
    newTaskTitle: PropTypes.string.isRequired,
    setNewTaskTitle: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    openTaskModal: PropTypes.func.isRequired,
    onToggleTaskCompletion: PropTypes.func.isRequired,
};

export default TaskList;