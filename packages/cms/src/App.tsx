import React from 'react';
// import './App.css';
import {appStore} from "./store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import MerchantPage from "./pages/MerchantPage";
import ProductPage from "./pages/ProductPage";
import {Provider} from "react-redux";

require('antd/dist/antd.less');

function App() {
  return (
    <Provider store={appStore}>
      {/*<BrowserRouter basename={window["__POWERED_BY_QIANKUN__"] ? '/app-react-history' : '/child/react-history/'}>*/}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<IndexPage/>}
          />
          <Route
            path="/merchant"
            element={<MerchantPage/>}
          />
          <Route
            path="/product"
            element={<ProductPage/>}
          />
        </Routes>
        <div> CMS !!</div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
