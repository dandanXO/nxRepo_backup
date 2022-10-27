import {Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import MerchantPage from "./pages/MerchantPage"
import ProductPage from "./pages/ProductPage";
import IndexPage from "./pages/IndexPage";
import {Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import MerchantPage from "../../../../packages/cms-webpack4/src/modules/product/components/pages/MerchantPage"
import Index from "../../../../packages/cms-webpack4/src/modules/product/components/pages/ProductPage";
import IndexPage from "../../../../packages/cms-webpack4/src/modules/shared/components/IndexPage";
import { Provider } from "react-redux";
import {appStore} from "../../../../packages/cms-webpack4/src/modules/core/store";

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
            element={<Index/>}
          />
        </Routes>
        <div> CMS !!</div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
