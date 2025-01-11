import {Component} from "react";
import {routes} from "../../routes.js";

class Login extends Component {

    render() {
        return (
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow p-4" style={{maxWidth: '400px', width: '100%'}}>
                    <h3 className="text-center mb-4">Войти</h3>
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
                        <button type="submit" className="btn btn-primary w-100 mt-3">Войти</button>
                    </form>
                    <div className="text-center mt-3">
                        <small>
                            Нет аккаунта? <a href={routes.register}
                                             className="text-decoration-none">Зарегистрируйтесь</a>
                        </small>
                    </div>
                </div>
            </div>
        )

    }
}

export default Login;