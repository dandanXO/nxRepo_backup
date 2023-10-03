import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { MexicoCountry } from '../../../../../../../libs/shared/domain/src/country/MexicoCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { environment } from '../../../../environments/environmentModule/environment';
import { renderByCountry } from '../../../modules/i18n';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { isShowNavigation } from '../../../modules/appEnvironment/isShowNavigation';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import MexicoPaymentInstructionPage from './i18nPage/MexicoPaymentCheckoutPage';
import PhilippinesPaymentInstructionPage from './i18nPage/PhilippinesPaymentCheckoutPage';

const navigatorMap = {
  [MexicoCountry.country]: '#E70020',
  [PhilippinesCountry.country]: '#E85D75',
};

const PaymentCheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Page className="flex flex-col">
      {isShowNavigation() && (
        <Navigation
          title={
            environment.country === MexicoCountry.country
              ? state.payType
              : 'Payment Instructions'
          }
          back={() => {
            navigate(
              `${
                PageOrModalPathEnum.RepaymentDetailPage
              }/repayment-modal?token=${getToken()}&orderNo=${state.orderNo}`,
              {
                state: {},
              }
            );
          }}
          backgroundColor={navigatorMap[environment.country]}
        />
      )}
      {state &&
        renderByCountry(
          {
            [MexicoCountry.country]: (
              <MexicoPaymentInstructionPage {...state} />
            ),
            [PhilippinesCountry.country]: (
              <PhilippinesPaymentInstructionPage {...state} />
            ),
          },
          <MexicoPaymentInstructionPage {...state} />
        )}
    </Page>
  );
};

export default PaymentCheckoutPage;
