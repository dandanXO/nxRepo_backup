import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {IndexPage} from "../pages/IndexPage";
import {AuthPage} from "../pages/AuthPage";
import {BankCardListPage} from "../pages/BankCardListPage";

export const AppRouter = () => {
  return (
    // <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes >
          <Route path="/" element={<IndexPage />}/>
          <Route path="/auth" element={<AuthPage />}/>
          <Route path="/bank-card-list" element={<BankCardListPage />}/>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    // </BrowserRouter>
  );
};
