import queryString from 'query-string';
import React from 'react';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { renderByCountry } from '../../../modules/i18n';
import { NativeAppInfo } from '../../../persistant/nativeAppInfo';
import IndiaPaymentResultPage from './i18nPage/IndiaPaymentResultPage';
import PhilippinesPaymentResultPage from './i18nPage/PhilippinesPaymentResultPage';

const PaymentResultPage = () => {
  const parseQueryString = queryString.parse(window.location.search);
  const result = (parseQueryString['result'] as 'complete' | 'failed') || '';

  const path = ['complete', 'failed'].includes(result) ? result : '';

  let resultImage;

  if (['complete', 'failed'].includes(result)) {
    try {
      resultImage =
        path === 'complete'
          ? require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_apply_complete.png`)
          : require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_apply_failed.png`);
    } catch (error) {
      resultImage =
        path === 'complete'
          ? require('../../../../assets/ic_apply_complete.png')
          : require('../../../../assets/ic_apply_failed.png');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {path ? (
        renderByCountry(
          {
            [IndiaCountry.country]: (
              <IndiaPaymentResultPage path={path} resultImage={resultImage} />
            ),
            [PhilippinesCountry.country]: (
              <PhilippinesPaymentResultPage
                path={path}
                resultImage={resultImage}
              />
            ),
          },
          <IndiaPaymentResultPage path={path} resultImage={resultImage} />
        )
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default PaymentResultPage;
