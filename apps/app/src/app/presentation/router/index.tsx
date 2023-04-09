import React, {Suspense, useState} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";

import { IndexPage } from "../pages/IndexPage";
import { AuthPage } from "../pages/AuthPage";
import { BankCardListPage } from "../pages/BankCardListPage";
import { BindBankCardPage } from "../pages/BindBankCardPage";
import { CustomerServicePage } from "../pages/CustomerServicePage";
import { DisclosureStatementPage } from "../pages/DisclosureStatementPage";
import { ExtendDetailsPage } from "../pages/ExtendDetailsPage";
import { FinishedRepaymentPage } from "../pages/FinishedRepaymentPage";
import { LoanRecordDetailPage } from "../pages/LoanRecordDetailPage";
import { LoanRecordPage } from "../pages/LoanRecordPage";
import { MyCouponListPage } from "../pages/MyCouponListPage";
import { MyCouponPage } from "../pages/MyCouponPage";
import { PartnerPage } from "../pages/PartnerPage";
import { PersonalInfoPage } from "../pages/PersonalInfoPage";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicyPage";
import { QuotaModelPage } from "../pages/QuotaModelPage";
import { UploadedPaymentReceiptPage } from "../pages/UploadedPaymentReceiptPage";
import { UploadPaymentReceiptPage } from "../pages/UploadPaymentReceiptPage";
import { CategoryPage } from "../pages/__test__/CategoryPage";
import RepaymentModal from '../modals/RepaymentModal';
import AmountRepaidModal from "../modals/AmountRepaidModal/AmountRepaidModal";
import { ExtendConfirmModal } from "../modals/ExtendConfirmModal";
import ExtendModal from "../modals/ExtendModal/ExtendModal";
import {ApplicationProgressPage} from "../pages/ApplicationProgressPage";
import { CustomerServiceModal } from "../modals/CustomerServiceModal";
import {LogoutModal} from "../modals/LogoutModal";
import {Tabs} from "antd";
import {TabBar} from "../components/layouts/TabBar";
import {APIBoundaryModal} from "../modals/APIBoundaryModal";
import {useSelector} from "react-redux";
import {RootState} from "../../usecaseFlow/reduxStore";
import {LoginPage} from '../pages/LoginPage';
import PrivacyPolicyModal from "../modals/PrivacyPolicyModal";


export const AppRouter = () => {
    const location = useLocation();
    const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);
    console.log("apiBoundary", apiBoundary)

    const payableRecords = useSelector((state: RootState) => state.indexPage.indexAPI?.payableRecords);
    return (
        // <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes >
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} >
                    <Route path="log-out-modal" element={<LogoutModal />} />
                </Route>
                <Route path="/privacy-policy-modal" element={<PrivacyPolicyModal />} />
                <Route path="/application-progress" element={<ApplicationProgressPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/bankcard-list" element={<BankCardListPage />} />
                <Route path="/bind-bankcard" element={<BindBankCardPage />} />
                <Route path="/customer-service" element={<CustomerServicePage />} >
                    <Route path="customer-service-modal" element={<CustomerServiceModal />} />
                </Route>
                <Route path="/disclosure-statement" element={<DisclosureStatementPage />} />
                <Route path="/extend-details" element={<ExtendDetailsPage />} />
                <Route path="/finished-repayment" element={<FinishedRepaymentPage />} />

                <Route path="/loan-record-detail" element={<LoanRecordDetailPage />}>
                    <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
                    <Route path="extend-modal" element={<ExtendModal />} />
                    <Route path="repayment-modal" element={<RepaymentModal />} />
                    <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
                </Route>
                <Route path="/loan-record" element={<LoanRecordPage />} />
                <Route path="/my-coupon-list" element={<MyCouponListPage />} />
                <Route path="/mu-coupon" element={<MyCouponPage />} />
                <Route path="/partner" element={<PartnerPage />} />
                <Route path="/personal-info" element={<PersonalInfoPage />} >
                    <Route path="log-out-modal" element={<LogoutModal />} />
                </Route>
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/quota-model" element={<QuotaModelPage />} />
                <Route path="/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
                <Route path="/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
                <Route path="/log-out-modal" element={<LogoutModal />} />
                <Route path="*" element={<div>Not Found</div>} />
            </Routes>
            {[
              "/",
              "/loan-record",
              "/personal-info"
            ].indexOf(location.pathname) > -1 && <TabBar hasOrder={payableRecords ? payableRecords?.length > 0 : false}/>}

          {apiBoundary.show && (
            <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message}/>
          )}


        </Suspense>
        // </BrowserRouter>
    );
};
