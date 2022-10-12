import React, {useEffect} from 'react';
import {Provider} from "react-redux";
import { ConfigProvider } from 'antd';
require('antd/dist/antd.less');
import {HashRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {createHashHistory} from "history";

import {appStore} from "./store";
import "./styles/app.less";
import IndexPage from "./pages/IndexPage";
import ProductPage from "./pages/ProductPage";
import MerchantPage from "./pages/MerchantPage";
import UserPage from "./pages/UserPage";
import UserInfoPage from "./pages/UserInfoPage";
import RiskSettingPage from "./modules/risk/pages/RiskSettingPage";

const Basename = window["__POWERED_BY_QIANKUN__"] ? '/cms' : '/';

const history = createHashHistory({
    basename: Basename,
})

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state)
})

function App() {
    useEffect(() => {
        // Listen for the event.
        window.addEventListener('main-app-hashchange', (e) => {
            console.log("[MicroApp] [receive] event main-app-hashchange", event);
        }, false);
    },[])
    return (
        <Provider store={appStore}>
            <ConfigProvider prefixCls="ant4">
                {/* NOTICE: [Its instance type 'BrowserRouter' is not a valid JSX element](https://stackoverflow.com/questions/71843747/its-instance-type-browserrouter-is-not-a-valid-jsx-element)*/}
                {/*<Router basename={window["__POWERED_BY_QIANKUN__"] ? '/cms' : '/'}>*/}
                {/*// @ts-ignore*/}
                <Router basename={Basename} history={history}>
                    {/*// @ts-ignore*/}
                    <Switch>
                        {/*// @ts-ignore*/}
                        <Route exact path="/" component={IndexPage}/>
                        {/*// @ts-ignore*/}
                        <Route path="/merchant" component={MerchantPage}/>
                        {/*// @ts-ignore*/}
                        <Route path="/product" component={ProductPage}/>
                        {/*// @ts-ignore*/}
                        <Route path="/user" component={UserPage}/>
                        {/*// @ts-ignore*/}
                        {/*// @ts-ignore*/}
                        <Route path="/risk-setting" component={RiskSettingPage}/>
                        {/*// @ts-ignore*/}
                        <Route path="/user-info/:userId" component={UserInfoPage}/>
                    </Switch>
                </Router>
            </ConfigProvider>
        </Provider>
  );
}

export default App;
