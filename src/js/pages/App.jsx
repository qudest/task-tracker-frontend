import {useState, useEffect} from 'react';
import request from '../axios_helper';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComp from '../components/NavbarComp';
import RegisterModal from '../components/RegisterModal';
import LoginModal from '../components/LoginModal';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';

import {Container} from 'react-bootstrap';
import {api_routes} from "../api_routes.js";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPassword2, setRegisterPassword2] = useState('');
    const [registerError, setRegisterError] = useState('');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser()
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    handleLogout();
                });
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTasks();
        } else {
            setTasks([]);
        }
    }, [isAuthenticated]);

    const getCurrentUser = async () => {
        const response = await request.get(api_routes.user);
        const userInfo = response.data;
        setCurrentUserEmail(userInfo.email);
    };

    const handleRegister = async () => {
        try {
            const response = await request.post(api_routes.register, {
                email: registerEmail,
                password: registerPassword,
            });
            const {token} = response.data;
            localStorage.setItem('token', token);

            await getCurrentUser();
            setIsAuthenticated(true);

            setShowRegisterModal(false);
            setRegisterEmail('');
            setRegisterPassword('');
            setRegisterPassword2('');
            setRegisterError('');
        } catch (error) {
            console.log(error);
            setRegisterError(error.response?.data?.messages?.join('\n') || 'Registration error');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await request.post(api_routes.login, {
                email: loginEmail,
                password: loginPassword
            });
            const {token} = response.data;
            localStorage.setItem('token', token);

            await getCurrentUser();
            setIsAuthenticated(true);

            setShowLoginModal(false);
            setLoginEmail('');
            setLoginPassword('');
            setLoginError('');
        } catch (error) {
            console.log(error);
            setLoginError(error.response?.data?.messages?.join('\n') || 'Login error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUserEmail('');
        setTasks([]);
    };

    const fetchTasks = async () => {
        try {
            const response = await request.get(api_routes.tasks);
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const response = await request.post(api_routes.tasks, {
                title: newTaskTitle,
                description: ''
            });
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        } catch (error) {
            console.log(error);
        }
    };

    const openTaskModal = (task) => {
        setSelectedTask({...task});
        setShowTaskModal(true);
    };

    const closeTaskModal = () => {
        setShowTaskModal(false);
        setSelectedTask(null);
    };

    const toggleTaskCompletion = async (task, newCompletedValue) => {
        const updatedTask = {...task, completed: newCompletedValue};

        try {
            const response = await request.put(api_routes.tasks + `/${updatedTask.id}`, updatedTask);
            const refreshedTask = response.data;

            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === refreshedTask.id ? refreshedTask : t))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const updateTaskField = async (field, value) => {
        if (!selectedTask) return;
        const updatedTask = {...selectedTask, [field]: value};
        setSelectedTask(updatedTask);

        try {
            const response = await request.put(api_routes.tasks + `/${updatedTask.id}`, updatedTask);
            const newTask = response.data;
            setTasks((prev) => prev.map((t) => (t.id === newTask.id ? newTask : t)));
            setSelectedTask(newTask);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleTaskCompleted = async () => {
        if (!selectedTask) return;
        const updatedTask = {
            ...selectedTask,
            completed: !selectedTask.completed,
        };

        try {
            const response = await request.put(api_routes.tasks + `/${updatedTask.id}`, updatedTask);
            const newTask = response.data;
            setTasks((prev) => prev.map((t) => (t.id === newTask.id ? newTask : t)));
            setSelectedTask(newTask);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async () => {
        if (!selectedTask) return;
        try {
            await request.delete(api_routes.tasks + `/${selectedTask.id}`);
            setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
            closeTaskModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <NavbarComp
                isAuthenticated={isAuthenticated}
                currentUserEmail={currentUserEmail}
                onShowRegister={() => setShowRegisterModal(true)}
                onShowLogin={() => setShowLoginModal(true)}
                onLogout={handleLogout}
            />

            <Container>
                {!isAuthenticated && (
                    <h4 className="text-center">Please login</h4>
                )}

                {isAuthenticated && (
                    <TaskList
                        tasks={tasks}
                        newTaskTitle={newTaskTitle}
                        setNewTaskTitle={setNewTaskTitle}
                        addTask={addTask}
                        openTaskModal={openTaskModal}
                        onToggleTaskCompletion={toggleTaskCompletion}
                    />
                )}
            </Container>

            <RegisterModal
                show={showRegisterModal}
                onHide={() => setShowRegisterModal(false)}
                registerEmail={registerEmail}
                registerPassword={registerPassword}
                registerPassword2={registerPassword2}
                registerError={registerError}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                setRegisterPassword2={setRegisterPassword2}
                handleRegister={handleRegister}
            />

            <LoginModal
                show={showLoginModal}
                onHide={() => setShowLoginModal(false)}
                loginEmail={loginEmail}
                loginPassword={loginPassword}
                loginError={loginError}
                setLoginEmail={setLoginEmail}
                setLoginPassword={setLoginPassword}
                handleLogin={handleLogin}
            />

            <TaskModal
                show={showTaskModal}
                onHide={closeTaskModal}
                selectedTask={selectedTask}
                updateTaskField={updateTaskField}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
            />
        </>
    );
}

export default App;