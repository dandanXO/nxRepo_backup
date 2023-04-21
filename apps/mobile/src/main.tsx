import "./app/sentry";
// NOTE: [TypeScript style guide](https://ts.dev/style/#identifiers)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

// NOTICE: React StrictMode renders components twice on dev server
// https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
