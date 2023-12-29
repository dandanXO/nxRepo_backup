import {renderByPlatform} from "../../utils/renderByPlatform";
import { InviteSettlementRecordPage as CInviteSettlementRecordPage } from "./env/coco/"
import { InviteSettlementRecordPage as RioInviteSettlementRecordPage } from "./env/riojungle"


export const InviteSettlementRecordPage = () => {

  return renderByPlatform({
    "riojungle777bet": <RioInviteSettlementRecordPage />,
  }, <CInviteSettlementRecordPage />);
}
