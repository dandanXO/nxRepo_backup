import React from 'react';
import { PrivacyAgreementPage as CocoPrivacyAgreementPage } from './env/coco';
import { PrivacyAgreementPage as RioPrivacyAgreementPage } from './env/riojungle';
import { renderByPlatform } from "../../utils/renderByPlatform";

export const PrivacyAgreementPage = () => {

  return renderByPlatform({
    "coco777bet": <CocoPrivacyAgreementPage />,
    "riojungle777bet": <RioPrivacyAgreementPage />,
  }, <CocoPrivacyAgreementPage />)
};
