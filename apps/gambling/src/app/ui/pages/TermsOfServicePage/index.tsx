import React from "react";
import { TermsOfServicePage as CocoTermsOfServicePage } from './env/coco';
import { TermsOfServicePage as RioTermsOfServicePage } from './env/riojungle';
import { renderByPlatform } from "../../utils/renderByPlatform";


const TermsOfServicePage = () => {

  return renderByPlatform({
    "u1": <CocoTermsOfServicePage />,
    "u2": <RioTermsOfServicePage />
  }, <CocoTermsOfServicePage />)
}

export default TermsOfServicePage;
