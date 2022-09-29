import React, {useEffect} from 'react';
// import './App.css';
import {appStore} from "./store";
import {HashRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import IndexPage from "./pages/index";
import MerchantPage from "./pages/merchant";
import ProductPage from "./pages/product";
import {Provider} from "react-redux";

require('antd/dist/antd.less');

import { ConfigProvider } from 'antd';

function App() {
    // <ProductPage/>

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
                <Router basename={window["__POWERED_BY_QIANKUN__"] ? '/cms' : '/'}>
                    {/*// @ts-ignore*/}
                    <Switch>
                        {/*// @ts-ignore*/}
                        <Route exact path="/" component={IndexPage}/>
                        {/*// @ts-ignore*/}
                        <Route path="/merchant" component={MerchantPage}/>
                        {/*// @ts-ignore*/}
                        <Route path="/product" component={ProductPage}/>
                    </Switch>
                </Router>
            </ConfigProvider>
        </Provider>
  );
}

export default App;
