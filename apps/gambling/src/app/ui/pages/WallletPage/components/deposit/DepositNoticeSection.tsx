import {renderByPlatform} from "../../../../utils/renderByPlatform";

import {DepositNoticeSection as PDepositNoticeSection} from "../../env/pernambucana/tabsContent/deposit/DepositNoticeSection";
import {DepositNoticeSection as WDepositNoticeSection} from "../../env/wild/tabsContent/deposit/DepositNoticeSection";
import {DepositNoticeSection as CDepositNoticeSection} from "../../env/coco/tabsContent/deposit/DepositNoticeSection";

export const DepositNoticeSection = () => {

  return renderByPlatform({
    "wild777bet": (
      <WDepositNoticeSection />
    ),
    "u1": (
      <CDepositNoticeSection />
    )
  }, (
    <PDepositNoticeSection/>
  ))

}
