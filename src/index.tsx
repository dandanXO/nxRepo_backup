import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <div className="text-rose-50 bg-indigo-300">DLH-Frontend</div>        
    </React.StrictMode>
);
