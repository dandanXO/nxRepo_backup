import React from 'react';
// import './App.css';
import {appStore} from "./store";
import {BrowserRouter, Route, Router } from "react-router-dom";
import IndexPage from "./pages/index";
import MerchantPage from "./pages/merchant";
import ProductPage from "./pages/product";
import {Provider} from "react-redux";

require('antd/dist/antd.less');

function App() {
  return (
    <Provider store={appStore}>
      {/*<BrowserRouter basename={window["__POWERED_BY_QIANKUN__"] ? '/app-react-history' : '/child/react-history/'}>*/}
      {/*    <div>Hello</div>*/}
      {/*    <Route*/}
      {/*      path="/"*/}
      {/*      component={IndexPage}*/}
      {/*    />*/}
      {/*    <Route*/}
      {/*      path="/merchant"*/}
      {/*      component={MerchantPage}*/}
      {/*    />*/}
      {/*    <Route*/}
      {/*      path="/product"*/}
      {/*      component={ProductPage}*/}
      {/*    />*/}
      {/*</BrowserRouter>*/}
        <ProductPage/>
    </Provider>
  );
}

export default App;
