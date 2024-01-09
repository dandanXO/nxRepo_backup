import {renderByPlatform} from "../../utils/renderByPlatform";
import { InviteSettlementRecordPage as CInviteSettlementRecordPage } from "./env/coco/"
import { InviteSettlementRecordPage as RioInviteSettlementRecordPage } from "./env/riojungle"


export const InviteSettlementRecordPage = () => {

  return renderByPlatform({
    "u2": <RioInviteSettlementRecordPage />,
  }, <CInviteSettlementRecordPage />);
}
