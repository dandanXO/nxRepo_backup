import { Route, Routes, Link } from 'react-router-dom';
import MerchantPage from "./pages/MerchantPage"
import ProductPage from "./pages/ProductPage";
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
          path="/merchant"
          element={<MerchantPage/>}
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
