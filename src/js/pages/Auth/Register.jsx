import {routes} from "../../routes.js";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {request} from "../../axios_helper.js";
import {api_routes} from "../../api_routes.js";

const Register = () => {
    const [credentials, setCredentials] = useState({email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            //todo redirect
            console.log('Registered');
        }
    }, [navigate]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            const response = await request.post(api_routes.register, {
                email: credentials.email,
                password: credentials.password
            });
            localStorage.setItem('token', response.data.token);
            request.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            // todo redirect
            console.log('Registered');
        } catch (error) {
            console.error('Ошибка при регистрации:', error.response?.data || error.message);
            setError(error.response?.data?.messages?.join('\n') || 'Ошибка при регистрации');
        }
    }, [credentials, navigate]);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setCredentials(prev => ({...prev, [id]: value}));
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{maxWidth: '400px', width: '100%'}}>
                <h3 className="text-center mb-4">Регистрация</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Электронная почта</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Введите email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Введите пароль"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Введите пароль ещё раз"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="8"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Зарегистрироваться</button>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Уже есть аккаунт? <a href={routes.login} className="text-decoration-none">Войдите</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;