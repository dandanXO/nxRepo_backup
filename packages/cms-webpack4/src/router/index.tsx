import React, { Component, Suspense } from "react";
import { BrowserRouter, HashRouter, Redirect, Route,  Router, Link, Switch,  } from "react-router-dom";
import { views } from "./config";
const ProductPage = () => <div>ProductPage</div>
export default function AppRouterView() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/*<HashRouter>*/}
            {/*    {*/}
            {/*        views.map(item => {*/}
            {/*            return (*/}
            {/*                <Route path={item.path} key={item.path} component={item.component} />*/}
            {/*            );*/}
            {/*        })*/}
            {/*    }*/}
            {/*    <Redirect to="/home" />*/}
            {/*</HashRouter>*/}
            <BrowserRouter basename={window["__POWERED_BY_QIANKUN__"] ? '/app-react-history' : '/child/react-history/'}>
                {/*<BrowserRouter>*/}
                <Route
                    path="/product"
                    component={ProductPage}
                />
                <div>Hello</div>
            </BrowserRouter>
        </Suspense>
    );
}
