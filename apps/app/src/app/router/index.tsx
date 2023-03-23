import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {IndexPage} from "../pages/IndexPage";
import {AuthPage} from "../pages/AuthPage";
import {BankCardListPage} from "../pages/BankCardListPage";
import {BindBankCardPage} from "../pages/BindBankCardPage";
import {CustomerServicePage} from "../pages/CustomerServicePage";
import {DisclosureStatementPage} from "../pages/DisclosureStatementPage";
import {ExtendDetailsPage} from "../pages/ExtendDetailsPage";
import {FinishedRepaymentPage} from "../pages/FinishedRepaymentPage";
import {LoanRecordDetailPage} from "../pages/LoanRecordDetailPage";
import {LoanRecordPage} from "../pages/LoanRecordPage";
import {MyCouponListPage} from "../pages/MyCouponListPage";
import {MyCouponPage} from "../pages/MyCouponPage";
import {PartnerPage} from "../pages/PartnerPage";
import {PersonalInfoPage} from "../pages/PersonalInfoPage";
import {PrivacyPolicyPage} from "../pages/PrivacyPolicyPage";
import {QuotaModelPage} from "../pages/QuotaModelPage";
import {UploadedPaymentReceiptPage} from "../pages/UploadedPaymentReceiptPage";
import {UploadPaymentReceiptPage} from "../pages/UploadPaymentReceiptPage";

export const AppRouter = () => {
  return (
    // <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes >
            <Route path="/" element={<IndexPage />}/>
            <Route path="/" element={<AuthPage />}/>
            <Route path="/" element={<BankCardListPage/>}/>
            <Route path="/" element={<BindBankCardPage/>}/>
            <Route path="/" element={<CustomerServicePage/>}/>
            <Route path="/" element={<DisclosureStatementPage/>}/>
            <Route path="/" element={<ExtendDetailsPage/>}/>
            <Route path="/" element={<FinishedRepaymentPage/>}/>
            <Route path="/" element={<LoanRecordDetailPage/>}/>
            <Route path="/" element={<LoanRecordPage/>}/>
            <Route path="/" element={<MyCouponListPage/>}/>
            <Route path="/" element={<MyCouponPage/>}/>
            <Route path="/" element={<PartnerPage/>}/>
            <Route path="/" element={<PersonalInfoPage/>}/>
            <Route path="/" element={<PrivacyPolicyPage/>}/>
            <Route path="/" element={<QuotaModelPage/>}/>
            <Route path="/" element={<UploadedPaymentReceiptPage/>}/>
            <Route path="/" element={<UploadPaymentReceiptPage/>}/>
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    // </BrowserRouter>
  );
};
