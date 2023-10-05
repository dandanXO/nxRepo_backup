import React from 'react';
import {useSelector} from "react-redux";
import {Route, Routes, useLocation} from "react-router";

import {RootState} from "../../../app/reduxStore";
import AppDataCollector from "../app/../../modules/dataCollectorContainer/AppDataCollector";


import LoadingMask from "../core-components/LoadingMask";

// NOTE: Page
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import LoanRecordPage from '../pages/RepaymentPage';
import LoginPage from "../pages/LoginPage";
import PaymentCheckoutPage from "../pages/PaymentCheckoutPage";
import PaymentResultPage from "../pages/PaymentResultPage";
import BankCardListPage from "../pages/BankCardListPage";
import BindBankCardPage from "../pages/BindBankCardPage";
import RepaymentDetailPage from "../pages/RepaymentDetailPage";
import UploadedPaymentReceiptPage from "../pages/UploadedPaymentReceiptPage";
import UploadPaymentReceiptPage from "../pages/UploadPaymentReceiptPage";
import CouponModalContentAndroidWebviewPage from "../pages/CouponModalContentAndroidWebviewPage";

// NOTE: Modal
import RepaymentModal from "../modals/RepaymentModal";
import AmountRepaidModal from "../modals/AmountRepaidModal/AmountRepaidModal";
import ExtendConfirmModal from "../modals/ExtendConfirmModal";
import ExtendModal from "../modals/ExtendModal";
import RepamentCouponModal from "../modals/RepaymentCouponModal";
import APIBoundaryModal from "../modals/APIBoundaryModal";


export const AppRouter = () => {
  // const isInit: boolean = useSelector((state: RootState) => state.app.isInit);
  const pageLoading = useSelector((state:any) => state.pageLoading);
  const apiBoundary = useSelector((state: RootState) => state.APIBoundaryModule);

  // React.useEffect(() => {
  //   // new
  //   posthog.capture('$pageview');
  // }, [location]);

  return (
    <AppDataCollector>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Routes>
        <Route path={PageOrModalPathEnum.LoginPage} element={<LoginPage />}/>
        <Route path={PageOrModalPathEnum.BindBankcard} element={<BindBankCardPage />}/>
        <Route path={PageOrModalPathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>
        <Route path={PageOrModalPathEnum.PaymentCheckoutPage} element={<PaymentCheckoutPage />}/>
        <Route path={PageOrModalPathEnum.PaymentResultPage} element={<PaymentResultPage />}/>
        <Route path="/v2/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
        <Route path="/v2/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
        <Route path="/v2/coupon-modal-content" element={<CouponModalContentAndroidWebviewPage />} />
        <Route
          path={PageOrModalPathEnum.BankcardListPage}
          element={<BankCardListPage />}
        />
        <Route path={PageOrModalPathEnum.RepaymentPage} element={<LoanRecordPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {apiBoundary.show && <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message} />}
      {pageLoading.show && <LoadingMask/>}
      {/*</Suspense>*/}
    </AppDataCollector>
  );
};
