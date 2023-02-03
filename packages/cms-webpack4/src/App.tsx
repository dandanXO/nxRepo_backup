import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import {appStore} from "./modules/shared/store";
import "./styles/app.less";
import {AppRouter} from "./AppRouter";
require('antd/dist/antd.less');
import "./i18n"

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { WaterMark } from '@ant-design/pro-components';
import moment from "moment/moment";

import {getAdminUser} from "./modules/shared/utils/getUserInfo";

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

    const adminUserInfo = getAdminUser();
    const phoneNo = adminUserInfo.data.phoneNo;
    const waterMarkColor = appInfo.COUNTRY !== 'Pakistan' ? 'rgba(0,0,0,.05)' : 'rgba(244,133,78,.05)';
    return (
        <Provider store={appStore}>
            <WaterMark height={0} width={200} gapX={100} gapY={100} offsetLeft={0} offsetTop={100} content={`${phoneNo} - ${moment().format('YYYY-MM-DD-HH:mm:ss')}`}  fontSize={20} fontColor={waterMarkColor} fontFamily={'Arial Black'}>
                <AppRouter />
            </WaterMark>
        </Provider>
    );
}

export default App;
