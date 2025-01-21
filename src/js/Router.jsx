import "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import App from "./pages/App.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;