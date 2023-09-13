import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { MexicoCountry } from '../../../../../../../libs/shared/domain/src/country/MexicoCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { environment } from '../../../../environments/environmentModule/environment';
import { renderByCountry } from '../../../modules/i18n';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';
import MexicoPaymentInstructionPage from './i18nPage/MexicoPaymentInstructionPage';

const navigatorMap = {
  [MexicoCountry.country]: '#E70020',
  [PhilippinesCountry.country]: '#E85D75',
};

const PaymentInstructionPage = () => {
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
                PagePathEnum.RepaymentDetailPage
              }/repayment-modal?token=${getToken()}&orderNo=${
                state.orderNo ?? getOrderNo()
              }`,
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
          },
          <MexicoPaymentInstructionPage {...state} />
        )}
    </Page>
  );
};

export default PaymentInstructionPage;
