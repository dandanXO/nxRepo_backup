import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import IndexPage from "../components/pages/IndexPage";
import LoanDetailsPage, {STATE_REPAYMENT_STEPS} from "../components/pages/LoanDetailsPage";
import ExtendDetailsPage from "../components/pages/ExtendDetailsPage";
import UploadPaymentReceiptPage from "../components/pages/UploadPaymentReceiptPage";
import BindBankAccountPage from "../components/pages/BindBankAccountPage";
import UploadedPaymentReceiptPage from "../components/pages/UploadedPaymentReceiptPage";
import ProductAdModalListPage from "../components/pages/ProductAdModalListPage";
import {ActivityAdListPage, DemoActivityAdListPage} from "../components/pages/ActivityAdListPage";
import {I18nRepaymentStepsModal} from "../components/pages/LoanDetailsPage/modal/RepaymentStepsModal";
import React from "react";
import {NewsSectionPage} from "../components/pages/NewsSectionPage";

// NOTE:
// https://stackoverflow.com/questions/10302179/hyphen-underscore-or-camelcase-as-word-delimiter-in-uris
// https://developers.google.com/search/docs/advanced/guidelines/url-structure?hl=en&visit_id=637961283238394064-158551757&rd=1
export const AppRouter = () => {
    return (
        <BrowserRouter>
          <Pages/>
        </BrowserRouter>
    );
};

const Pages = () => {
  // const location = useLocation();
  // const showRepaymentStepsModal = location.state && location.state.name === STATE_REPAYMENT_STEPS;
  // console.log("showRepaymentStepsModal", showRepaymentStepsModal);
  // const state = location.state as { name?: Location };

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        {/* url: /loan-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
        <Route path="/loan-details" element={<LoanDetailsPage />} />
        {/* url: /extend-details?token=xxxxxxxx&orderNo=xxxxxxxx */}
        <Route path="/extend-details" element={<ExtendDetailsPage />} />
        <Route path="/repayment-modal-advertisement" element={<div />} />
        <Route path="/bank-bind" element={<BindBankAccountPage />} />
        <Route path="/upload-payment-receipt" element={<UploadPaymentReceiptPage />}/>
        <Route path="/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />}/>
        <Route path="/product-ad-modal-list" element={<ProductAdModalListPage />}/>
        {/*NOTICE: ad 字眼容易被 Google 擋*/}
        <Route path="/activity-list" element={<ActivityAdListPage />}/>
        <Route path="/activity-list-dev" element={<DemoActivityAdListPage/>}/>
        <Route path="/news-section" element={<NewsSectionPage/>}/>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {/*{state?.name && (*/}
      {/*  <Routes>*/}
      {/*    <Route path={`/loan-details`} element={<I18nRepaymentStepsModal/>}/>*/}
      {/*  </Routes>*/}
      {/*)}*/}
    </>
  )
}
