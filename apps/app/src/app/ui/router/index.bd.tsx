import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import { RootState } from '../../reduxStore';
import AppDataCollector from '../../uiFlowDataCollector/AppDataCollector';
import { PageOrModalPathEnum } from '../PageOrModalPathEnum';
import LoadingMask from '../core-components/LoadingMask';
import APIBoundaryModal from '../modals/APIBoundaryModal';
import AmountRepaidModal from '../modals/AmountRepaidModal/AmountRepaidModal';
import ExtendConfirmModal from '../modals/ExtendConfirmModal';
import ExtendModal from '../modals/ExtendModal';
import RepamentCouponModal from '../modals/RepaymentCouponModal';
import RepaymentModal from '../modals/RepaymentModal';
import BindBankCardPage from '../pages/BindBankCardPage';
import CouponModalContentAndroidWebviewPage from '../pages/CouponModalContentAndroidWebviewPage';
import PaymentCheckoutPage from '../pages/PaymentCheckoutPage';
import PaymentResultPage from '../pages/PaymentResultPage';
import RepaymentDetailPage from '../pages/RepaymentDetailPage';
import UploadPaymentReceiptPage from '../pages/UploadPaymentReceiptPage';
import UploadedPaymentReceiptPage from '../pages/UploadedPaymentReceiptPage';

export const AppRouter = () => {
  // const isInit: boolean = useSelector((state: RootState) => state.app.isInit);
  const pageLoading = useSelector((state: any) => state.pageLoading);
  const apiBoundary = useSelector(
    (state: RootState) => state.APIBoundaryModule
  );

  // React.useEffect(() => {
  //   // new
  //   posthog.capture('$pageview');
  // }, [location]);

  return (
    <AppDataCollector>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Routes>
        {/* <Route path={PagePathEnum.LoginPage} element={<LoginPage />}/> */}
        <Route
          path={PageOrModalPathEnum.BindBankcard}
          element={<BindBankCardPage />}
        />
        <Route
          path={PageOrModalPathEnum.RepaymentDetailPage}
          element={<RepaymentDetailPage />}
        >
          <Route path="repayment-modal" element={<RepaymentModal />} />
          <Route
            path="amount-repaid-record-modal"
            element={<AmountRepaidModal />}
          />
          <Route path="extend-confirm-modal" element={<ExtendConfirmModal />} />
          <Route path="extend-modal" element={<ExtendModal />} />
          <Route
            path="repayment-coupon-modal"
            element={<RepamentCouponModal />}
          />
        </Route>
        <Route
          path={PageOrModalPathEnum.PaymentCheckoutPage}
          element={<PaymentCheckoutPage />}
        />
        <Route
          path={PageOrModalPathEnum.PaymentResultPage}
          element={<PaymentResultPage />}
        />
        <Route
          path="/v2/uploaded-payment-receipt"
          element={<UploadedPaymentReceiptPage />}
        />
        <Route
          path="/v2/upload-payment-receipt"
          element={<UploadPaymentReceiptPage />}
        />
        <Route
          path="/v2/coupon-modal-content"
          element={<CouponModalContentAndroidWebviewPage />}
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {apiBoundary.show && (
        <APIBoundaryModal
          title={apiBoundary.title}
          message={apiBoundary.message}
        />
      )}
      {pageLoading.show && <LoadingMask />}
      {/*</Suspense>*/}
    </AppDataCollector>
  );
};
