import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import {appStore} from "./modules/core/store";
import "./styles/app.less";
import {AppRouter} from "./AppRouter";
require('antd/dist/antd.less');
import "./i18n"

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "https://cf9c82eab5004dd492404928f531e5ca@o4504354754985984.ingest.sentry.io/4504354755969024",
    integrations: [new BrowserTracing()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    environment: `${appInfo.COUNTRY}`,
    tracesSampleRate: 1.0,
});


function App() {

    useEffect(() => {
        // Listen for the event.
        window.addEventListener('main-app-hashchange', (e) => {
            console.log("[MicroApp] [receive] event main-app-hashchange", event);
        }, false);
    }, [])
    return (
        <Provider store={appStore}>
            <AppRouter />
        </Provider>
    );
}

export default App;
