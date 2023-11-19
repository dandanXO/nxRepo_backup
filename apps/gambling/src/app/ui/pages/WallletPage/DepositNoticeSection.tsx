import {renderByPlatform} from "../../utils/renderByPlatform";

import {DepositNoticeSection as PDepositNoticeSection} from "./env/pernambucana/DepositNoticeSection";
import {DepositNoticeSection as WDepositNoticeSection} from "./env/wild/DepositNoticeSection";
import {DepositNoticeSection as CDepositNoticeSection} from "./env/coco/DepositNoticeSection";

export const DepositNoticeSection = () => {

  return renderByPlatform({
    "wild777bet": (
      <WDepositNoticeSection />
    ),
    "coco777bet": (
      <CDepositNoticeSection />
    )
  }, (
    <PDepositNoticeSection/>
  ))

}
