import "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import {routes} from "./routes.js";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.login} element={<Login/>}/>
                <Route path={routes.register} element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;