import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { MexicoCountry, PhilippinesCountry } from '@frontend/shared/domain';

import { environment } from '../../../../environments/environmentModule/environment';
import { getToken } from '../../../application/getToken';
import { isShowNavigation } from '../../../device/isShowNavigation';
import { useLazyGetRepayPayInfoQuery } from '../../../externel/backend/rtk';
import { renderByCountry } from '../../../modules/i18n';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import MexicoPaymentInstructionPage from './i18nPage/MexicoPaymentCheckoutPage';
import PhilippinesPaymentInstructionPage from './i18nPage/PhilippinesPaymentCheckoutPage';

// TODO: Refactor Color
const navigatorMap = {
  [MexicoCountry.country]: '#E70020',
  [PhilippinesCountry.country]: '#E85D75',
};

const PaymentCheckoutPage = () => {
  const parseQueryString = queryString.parse(window.location.search);
  const hash = (parseQueryString['hash'] as string) || '';
  const navigate = useNavigate();
  const { state } = useLocation();

  const [triggerGetPayInfo, { currentData }] = useLazyGetRepayPayInfoQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (hash) {
      triggerGetPayInfo({ hash });
    }
  }, []);

  return (
    <Page className="flex flex-col">
      {isShowNavigation() && (
        <Navigation
          title={
            environment.country === MexicoCountry.country
              ? state?.payType || currentData?.payType
              : 'Payment Instructions'
          }
          back={
            hash
              ? undefined
              : () => {
                  navigate(
                    `${
                      PageOrModalPathEnum.RepaymentDetailPage
                    }/repayment-modal?token=${getToken()}&orderNo=${
                      state.orderNo
                    }`,
                    {
                      state: {},
                    }
                  );
                }
          }
          backgroundColor={navigatorMap[environment.country]}
        />
      )}
      {(state || currentData) &&
        renderByCountry(
          {
            [MexicoCountry.country]: (
              <MexicoPaymentInstructionPage {...state} {...currentData} />
            ),
            [PhilippinesCountry.country]: (
              <PhilippinesPaymentInstructionPage {...state} {...currentData} />
            ),
          },
          <MexicoPaymentInstructionPage {...state} {...currentData} />
        )}
    </Page>
  );
};

export default PaymentCheckoutPage;
