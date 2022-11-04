// NOTE: [TypeScript style guide](https://ts.dev/style/#identifiers)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import {environment} from "./environments/environment";

console.log("environment.production", environment.production)
console.log("environment.country", environment.country)

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
