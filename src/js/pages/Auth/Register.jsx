import {Component} from "react";
import {routes} from "../../routes.js";

class Register extends Component {

    render() {
        return (
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow p-4" style={{maxWidth: '400px', width: '100%'}}>
                    <h3 className="text-center mb-4">Регистрация</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Электронная почта</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Введите email"
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
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Введите пароль ещё раз"
                                required
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
        )

    }
}

export default Register;