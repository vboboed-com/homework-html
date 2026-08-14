import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./style.css";
import {ContragentProvider} from "./app/context/ContragentContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ContragentProvider>
            <App />
        </ContragentProvider>
    </React.StrictMode>
);