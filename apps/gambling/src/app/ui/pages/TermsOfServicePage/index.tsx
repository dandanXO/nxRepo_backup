import React from "react";
import { TermsOfServicePage as CocoTermsOfServicePage } from './env/u1';
import { TermsOfServicePage as RioTermsOfServicePage } from './env/u2';
import { renderByUVersion } from "../../utils/renderByUVersion";


const TermsOfServicePage = () => {

  return renderByUVersion({
    "u1": <CocoTermsOfServicePage />,
    "u2": <RioTermsOfServicePage />
  }, <CocoTermsOfServicePage />)
}

export default TermsOfServicePage;
