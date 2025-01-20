import {routes} from "../../routes.js";
import {request} from "../../axios_helper.js";
import {useEffect, useState, useCallback} from "react";
import {api_routes} from "../../api_routes.js";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            //todo redirect
            console.log('Authenticated');
        }
    }, [navigate]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            const response = await request.post(api_routes.login, credentials);
            localStorage.setItem('token', response.data.token);
            request.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            // todo redirect
            console.log('Authenticated');
        } catch (error) {
            console.error('Ошибка при входе:', error.response?.data || error.message);
            setError(error.response?.data?.messages?.join('\n') || 'Ошибка при входе');
        }
    }, [credentials, navigate]);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setCredentials(prev => ({...prev, [id]: value}));
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{maxWidth: '400px', width: '100%'}}>
                <h3 className="text-center mb-4">Войти</h3>
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
                    <button type="submit" className="btn btn-primary w-100 mt-3">Войти</button>
                </form>
                <div className="text-center mt-3">
                    <small>
                        Нет аккаунта? <a href={routes.register} className="text-decoration-none">Зарегистрируйтесь</a>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;