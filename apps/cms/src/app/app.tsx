import {Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import MerchantPage from "./pages/MerchantPage"
import ProductPage from "./pages/ProductPage";
import IndexPage from "./pages/IndexPage";
import {Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import MerchantPage from "../../../../packages/cms-webpack4/src/pages/MerchantPage"
import ProductPage from "../../../../packages/cms-webpack4/src/pages/ProductPage";
import IndexPage from "../../../../packages/cms-webpack4/src/pages/IndexPage";
import { Provider } from "react-redux";
import {appStore} from "../../../../packages/cms-webpack4/src/store";

export function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename={window["__POWERED_BY_QIANKUN__"] ? '/app-react-history' : '/child/react-history/'}>
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
