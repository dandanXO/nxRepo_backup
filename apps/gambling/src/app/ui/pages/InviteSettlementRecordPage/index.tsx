import {renderByUVersion} from "../../utils/renderByUVersion";
import { InviteSettlementRecordPage as CInviteSettlementRecordPage } from "./env/u1/"
import { InviteSettlementRecordPage as RioInviteSettlementRecordPage } from "./env/u2"


export const InviteSettlementRecordPage = () => {

  return renderByUVersion({
    "u2": <RioInviteSettlementRecordPage />,
  }, <CInviteSettlementRecordPage />);
}
