import queryString from 'query-string';
import React from 'react';

import { NativeAppInfo } from '../../../persistant/nativeAppInfo';

const PaymentResultPage = () => {
  const parseQueryString = queryString.parse(window.location.search);
  const result = (parseQueryString['result'] as string) || '';

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
        <div className="flex flex-col items-center justify-center">
          <img src={resultImage} alt="result" />
          <div className="text-primary-main py-4 font-bold">
            {path === 'complete' ? 'Repayment Successful' : 'Failed'}
          </div>
          <div className="text-ctext-secondary w-3/5 text-center text-sm font-medium">
            {path === 'complete'
              ? 'The repayment was successful, and the order has been settled.'
              : 'Bank acceptance is in progress, which may take anywhere from ten seconds to several seconds. Please wait patiently.'}
          </div>
        </div>
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default PaymentResultPage;
