import React from 'react';
import {useSelector} from "react-redux";
import {Route, Routes, useLocation} from "react-router";

import {RootState} from "../../../app/reduxStore";
import AppDataCollector from "../app/../../modules/dataCollectorContainer/AppDataCollector";


import LoadingMask from "../../../app/presentation/core-components/LoadingMask";

// NOTE: Page
import {PagePathEnum} from "../../../app/presentation/pages/PagePathEnum";
import LoanRecordPage from '../../../app/presentation/pages/RepaymentPage';
import LoginPage from "../../../app/presentation/pages/LoginPage";
import PaymentCheckoutPage from "../pages/PaymentCheckoutPage";
import PaymentResultPage from "../../../app/presentation/pages/PaymentResultPage";
import BankCardListPage from "../../../app/presentation/pages/BankCardListPage";
import BindBankCardPage from "../../../app/presentation/pages/BindBankCardPage";
import RepaymentDetailPage from "../../../app/presentation/pages/RepaymentDetailPage";
import UploadedPaymentReceiptPage from "../../../app/presentation/pages/UploadedPaymentReceiptPage";
import UploadPaymentReceiptPage from "../../../app/presentation/pages/UploadPaymentReceiptPage";
import CouponModalContentAndroidWebviewPage from "../../../app/presentation/pages/CouponModalContentAndroidWebviewPage";

// NOTE: Modal
import RepaymentModal from "../../../app/presentation/modals/RepaymentModal";
import AmountRepaidModal from "../../../app/presentation/modals/AmountRepaidModal/AmountRepaidModal";
import ExtendConfirmModal from "../../../app/presentation/modals/ExtendConfirmModal";
import ExtendModal from "../../../app/presentation/modals/ExtendModal";
import RepamentCouponModal from "../../../app/presentation/modals/RepaymentCouponModal";
import APIBoundaryModal from "../../../app/presentation/modals/APIBoundaryModal";


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
        <Route path={PagePathEnum.LoginPage} element={<LoginPage />}/>
        <Route path={PagePathEnum.BindBankcard} element={<BindBankCardPage />}/>
        <Route path={PagePathEnum.RepaymentDetailPage} element={<RepaymentDetailPage />}>
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route path="amount-repaid-record-modal" element={<AmountRepaidModal />} />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route path="repayment-coupon-modal" element={<RepamentCouponModal />} />
        </Route>
        <Route path={PagePathEnum.PaymentCheckoutPage} element={<PaymentCheckoutPage />}/>
        <Route path={PagePathEnum.PaymentResultPage} element={<PaymentResultPage />}/>
        <Route path="/v2/uploaded-payment-receipt" element={<UploadedPaymentReceiptPage />} />
        <Route path="/v2/upload-payment-receipt" element={<UploadPaymentReceiptPage />} />
        <Route path="/v2/coupon-modal-content" element={<CouponModalContentAndroidWebviewPage />} />
        <Route
          path={PagePathEnum.BankcardListPage}
          element={<BankCardListPage />}
        />
        <Route path={PagePathEnum.RepaymentPage} element={<LoanRecordPage />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {apiBoundary.show && <APIBoundaryModal title={apiBoundary.title} message={apiBoundary.message} />}
      {pageLoading.show && <LoadingMask/>}
      {/*</Suspense>*/}
    </AppDataCollector>
  );
};
