// import Button from "../../components/Button";
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { useLazyGetLoanDetailQuery } from '../../../api/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { isInAndroid } from '../../../modules/window/isInAndroid';
import { Navigation } from '../../components/layouts/Navigation';
import { PagePathEnum } from '../PagePathEnum';
import IndiaRepaymentDetailPage from './i18n/IndiaRepaymentDetailPage';
import PakistanRepaymentDetailPage from './i18n/PakistanRepaymentDetailPage';

const RepaymentDetailPage = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] =
    useLazyGetLoanDetailQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  useEffect(() => {
    triggerGetList({ orderNo: location.state?.orderNo || getOrderNo() });
  }, []);

  return (
    <div>
      {!isInAndroid() && (
        <Navigation
          title={'Payment Details'}
          back={() => {
            navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`);
          }}
        />
      )}
      {currentData && currentData?.status !== 'PAY_OFF' && currentData?.status !== 'EXTEND' && (
        <div className={`bg-primary-assistant text-primary-main py-2 text-center text-sm`}>
          Get more amount after instant payment
        </div>
      )}
      {renderByCountry(
        {
          [IndiaCountry.country]: <IndiaRepaymentDetailPage currentData={currentData} />,
          [PakistanCountry.country]: <PakistanRepaymentDetailPage currentData={currentData} />,
        },
        <IndiaRepaymentDetailPage currentData={currentData} />
      )}
      <Outlet />
    </div>
  );
};

export default RepaymentDetailPage;
