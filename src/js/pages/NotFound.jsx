import 'react';

const NotFound = () => {
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="display-1 text-danger">404</h1>
                <p className="lead">Упс! Страница не найдена.</p>
                <p>К сожалению, мы не смогли найти запрашиваемую вами страницу.</p>
                <a href="/" className="btn btn-primary mt-4">Вернуться на главную</a>
            </div>
        </div>
    );
};

export default NotFound;