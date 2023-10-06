// import Button from "../../components/Button";
import { MexicoCountry } from '@frontend/shared/domain';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { IndiaCountry } from '@frontend/shared/domain';
import { PakistanCountry } from '@frontend/shared/domain';
import { PhilippinesCountry } from '@frontend/shared/domain';
import { useLazyGetLoanDetailQuery } from '../../../externel/backend/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { getToken } from '../../../application/getToken';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../core-components/Navigation';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import IndiaRepaymentDetailPage from './i18nPage/india/IndiaRepaymentDetailPage';
import MexicoRepaymentDetailPage from './i18nPage/mexico/MexicoRepaymentDetailPage';
import PakistanRepaymentDetailPage from './i18nPage/pakistan/PakistanRepaymentDetailPage';
import PhilippinesRepaymentDetailPage from './i18nPage/philippines/PhilippinesRepaymentDetailPage';
import { RepaymentDetailPageUseCaseActions } from './userUsecaseSaga';
import { isShowNavigation } from '../../../device/isShowNavigation';

const RepaymentDetailPage = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state);

  const currentData = state.repaymentDetailPage.repaymentDetail;
  const isFetching = state.rtkPending.isPending;

  useEffect(() => {
    dispatch(RepaymentDetailPageUseCaseActions.user.repaymentDetail());
  }, []);

  return (
    <div>
      {isShowNavigation() && (
        <Navigation
          title={'Payment Details'}
          back={() => {
            navigate(`${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`);
          }}
        />
      )}

      {currentData !== undefined &&
        renderByCountry(
          {
            [IndiaCountry.country]: (
              <IndiaRepaymentDetailPage
                currentData={currentData}
                isFetching={isFetching}
              />
            ),
            [PakistanCountry.country]: (
              <PakistanRepaymentDetailPage
                currentData={currentData}
                isFetching={isFetching}
              />
            ),
            [MexicoCountry.country]: (
              <MexicoRepaymentDetailPage
                currentData={currentData}
                isFetching={isFetching}
              />
            ),
            [PhilippinesCountry.country]: (
              <PhilippinesRepaymentDetailPage
                currentData={currentData}
                isFetching={isFetching}
              />
            ),
          },
          <IndiaRepaymentDetailPage
            currentData={currentData}
            isFetching={isFetching}
          />
        )}
      <Outlet />
    </div>
  );
};

export default RepaymentDetailPage;
