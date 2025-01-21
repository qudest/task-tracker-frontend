import 'react';

const NotFound = () => {
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="display-1 text-danger">404</h1>
                <p className="lead">Oops! Page not found.</p>
                <p>Unfortunately, we could not find the page you requested.</p>
                <a href="/" className="btn btn-primary mt-4">Back to Home</a>
            </div>
        </div>
    );
};

export default NotFound;