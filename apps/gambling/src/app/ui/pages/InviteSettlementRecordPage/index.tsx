import {renderByUVersion} from "../../utils/renderByUVersion";
import { InviteSettlementRecordPage as CInviteSettlementRecordPage } from "./env/coco/"
import { InviteSettlementRecordPage as RioInviteSettlementRecordPage } from "./env/riojungle"


export const InviteSettlementRecordPage = () => {

  return renderByUVersion({
    "u2": <RioInviteSettlementRecordPage />,
  }, <CInviteSettlementRecordPage />);
}
