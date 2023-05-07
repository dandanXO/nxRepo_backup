import { useNavigate } from 'react-router';
import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';
import { useCallback } from 'react';
import { PureUploadedPaymentReceiptPage } from './PureUploadedPaymentReceiptPage';
import { PagePathEnum } from '../PagePathEnum';

const UploadedPaymentReceiptPage = () => {
  const navigate = useNavigate();
  const pageQueryString = useLocationOrderQueryString();
  const navigateToLoanDetails = useCallback(() => {
    navigate(
      `${PagePathEnum.RepaymentDetailPage}?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`
    );
  }, [pageQueryString.token, pageQueryString.orderNo]);

  return (
    <PureUploadedPaymentReceiptPage
      navigateToLoanDetails={navigateToLoanDetails}
    />
  );
};

export default UploadedPaymentReceiptPage;
