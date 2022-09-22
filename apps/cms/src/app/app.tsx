import { Route, Routes, Link } from 'react-router-dom';
import MerchantManagePage from "./pages/merchantManage"
import ProductPage from "./pages/product";
import IndexPage from "./pages/IndexPage";
import { Provider } from "react-redux";
import {appStore} from "./store";

export function App() {
  return (
    <Provider store={appStore}>
      <Routes>
        <Route
          path="/"
          element={<IndexPage/>}
        />
        <Route
          path="/merchant-manage"
          element={<MerchantManagePage/>}
        />
        <Route
          path="/product"
          element={<ProductPage/>}
        />
      </Routes>
    </Provider>
  );
}

export default App;
