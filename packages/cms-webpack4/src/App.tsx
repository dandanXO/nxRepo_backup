import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import { ConfigProvider } from 'antd';
require('antd/dist/antd.less');
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { createHashHistory } from "history";
import { appStore } from "./store";
import "./styles/app.less";
import IndexPage from "./modules/shared/components/IndexPage";
import ProductPage from "./modules/product/components/ProductPage";
import MerchantPage from "./modules/merchant/components/MerchantPage";
import UserPage from "./modules/user/components/UserPage";
import UserInfoPage from "./modules/userInfo/components/UserInfoPage";
import RiskSettingPage from "./modules/risk/components/RiskSettingPage";
import { setSearchParams, selectSearchParams } from './modules/shared/utils/searchParamsSlice';
import { useDispatch, useSelector } from "react-redux"
import {AppRouter} from "./AppRouter";

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
