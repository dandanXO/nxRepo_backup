import React from "react";
import { TermsOfServicePage as CocoTermsOfServicePage } from './env/coco';
import { TermsOfServicePage as RioTermsOfServicePage } from './env/riojungle';
import { renderByUVersion } from "../../utils/renderByUVersion";


const TermsOfServicePage = () => {

  return renderByUVersion({
    "u1": <CocoTermsOfServicePage />,
    "u2": <RioTermsOfServicePage />
  }, <CocoTermsOfServicePage />)
}

export default TermsOfServicePage;
