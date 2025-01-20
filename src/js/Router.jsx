import "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import {routes} from "./routes.js";
import NotFound from "./pages/NotFound.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.login} element={<Login/>}/>
                <Route path={routes.register} element={<Register/>}/>
                <Route path="/" element={<Login/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;