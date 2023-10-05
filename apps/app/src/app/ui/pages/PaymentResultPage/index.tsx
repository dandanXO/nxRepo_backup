import queryString from 'query-string';
import React from 'react';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { environment } from '../../../../environments/environmentModule/environment';
import { renderByCountry } from '../../../modules/i18n';
import { NativeAppInfo } from '../../../persistant/nativeAppInfo';
import IndiaPaymentResultPage from './i18nPage/IndiaPaymentResultPage';
import PhilippinesPaymentResultPage from './i18nPage/PhilippinesPaymentResultPage';
import {MexicoCountry} from "../../../../../../../libs/shared/domain/src/country/MexicoCountry";
import MexicoPaymentResultPage from './i18nPage/MexicoPaymentResultPage';
import {useLocation} from "react-router";

type IPaymentResultPageSearchParams = {
  result?: 'complete' | 'failed';
}

const PaymentResultPage = () => {

  const location = useLocation();
  const parsedQuery = queryString.parse(location.search) as IPaymentResultPageSearchParams;
  const path = parsedQuery.result;
  let resultImage;

  if (path && ['complete', 'failed'].includes(path)) {
    try {
      resultImage =
        path === 'complete'
          ? require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_apply_complete.png`)
          : require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_apply_failed.png`);
    } catch (error) {
      try {
        resultImage =
          path === 'complete'
            ? require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${environment.defaultUIVersion}/ic_apply_complete.png`)
            : require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${environment.defaultUIVersion}/ic_apply_failed.png`);
      } catch (error) {
        resultImage =
          path === 'complete'
            ? require('../../components/images/ic_apply_complete.png')
            : require('../../components/images/ic_apply_failed.png');
      }
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      {path ? (
        renderByCountry(
          {
            [IndiaCountry.country]: (
              <IndiaPaymentResultPage path={path} resultImage={resultImage} />
            ),
            [MexicoCountry.country]: (
              <MexicoPaymentResultPage path={path} resultImage={resultImage} />
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
