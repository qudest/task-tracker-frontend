import 'bootstrap/dist/css/bootstrap.min.css';
import {createRoot} from "react-dom/client";
import Router from "./Router.jsx";

const domNode = document.getElementById('app');
const root = createRoot(domNode);

root.render(<Router/>);