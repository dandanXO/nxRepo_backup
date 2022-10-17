import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import {appStore} from "./store";
import "./styles/app.less";
import {AppRouter} from "./AppRouter";

require('antd/dist/antd.less');

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
