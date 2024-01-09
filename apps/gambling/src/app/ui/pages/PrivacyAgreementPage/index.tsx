import React from 'react';
import { PrivacyAgreementPage as CocoPrivacyAgreementPage } from './env/coco';
import { PrivacyAgreementPage as RioPrivacyAgreementPage } from './env/riojungle';
import { renderByUVersion } from "../../utils/renderByUVersion";

export const PrivacyAgreementPage = () => {

  return renderByUVersion({
    "u1": <CocoPrivacyAgreementPage />,
    "u2": <RioPrivacyAgreementPage />,
  }, <CocoPrivacyAgreementPage />)
};
