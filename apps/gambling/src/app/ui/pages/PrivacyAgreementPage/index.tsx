import React from 'react';
import { PrivacyAgreementPage as CocoPrivacyAgreementPage } from './env/coco';
import { PrivacyAgreementPage as RioPrivacyAgreementPage } from './env/riojungle';
import { renderByPlatform } from "../../utils/renderByPlatform";

export const PrivacyAgreementPage = () => {

  return renderByPlatform({
    "u1": <CocoPrivacyAgreementPage />,
    "u2": <RioPrivacyAgreementPage />,
  }, <CocoPrivacyAgreementPage />)
};
