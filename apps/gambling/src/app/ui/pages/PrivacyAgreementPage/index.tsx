import React from 'react';
import { PrivacyAgreementPage as CocoPrivacyAgreementPage } from './env/u1';
import { PrivacyAgreementPage as RioPrivacyAgreementPage } from './env/u2';
import { renderByUVersion } from "../../utils/renderByUVersion";

export const PrivacyAgreementPage = () => {

  return renderByUVersion({
    "u1": <CocoPrivacyAgreementPage />,
    "u2": <RioPrivacyAgreementPage />,
  }, <CocoPrivacyAgreementPage />)
};
