import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { PagePathEnum } from '../PagePathEnum';
import { PureUploadedPaymentReceiptPage } from './PureUploadedPaymentReceiptPage';

const UploadedPaymentReceiptPage = () => {
  const navigate = useNavigate();
  const pageQueryString = useLocationOrderQueryString();
  const navigateToLoanDetails = useCallback(() => {
    navigate(`${PagePathEnum.RepaymentDetailPage}?token=${pageQueryString.token}&orderNo=${pageQueryString.orderNo}`, {
      // NOTICE:
      replace: true,
    });
  }, [pageQueryString.token, pageQueryString.orderNo]);

  return <PureUploadedPaymentReceiptPage navigateToLoanDetails={navigateToLoanDetails} />;
};

export default UploadedPaymentReceiptPage;
