// import Button from "../../components/Button";
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { useLazyGetLoanDetailQuery } from '../../../api/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import { Navigation } from '../../components/layouts/Navigation';
import { PagePathEnum } from '../PagePathEnum';
import IndiaRepaymentDetailPage from './i18nPage/india/IndiaRepaymentDetailPage';
import PakistanRepaymentDetailPage from './i18nPage/pakistan/PakistanRepaymentDetailPage';
import { RepaymentDetailPageUseCaseActions } from './userUsecaseSaga';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import MexicoRepaymentDetailPage from './i18nPage/mexico/MexicoRepaymentDetailPage';

const RepaymentDetailPage = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state)

  const currentData = state.repaymentDetailPage.repaymentDetail
  const isFetching = state.rtkPending.isPending;

  useEffect(() => {
    dispatch(RepaymentDetailPageUseCaseActions.user.repaymentDetail())
  }, []);

  return (
    <div>
      {isShowNavigation() && (
        <Navigation
          title={'Payment Details'}
          back={() => {
            navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`);
          }}
        />
      )}

      {currentData!==undefined && renderByCountry(
        {
          [IndiaCountry.country]: <IndiaRepaymentDetailPage currentData={currentData} isFetching={isFetching}/>,
          [PakistanCountry.country]: <PakistanRepaymentDetailPage currentData={currentData} isFetching={isFetching}/>,
          [MexicoCountry.country]: <MexicoRepaymentDetailPage currentData={currentData} isFetching={isFetching}/>,
        },
        <IndiaRepaymentDetailPage currentData={currentData} isFetching={isFetching}/>
      )}
      <Outlet />
    </div>
  );
};

export default RepaymentDetailPage;
