import {renderByUVersion} from "../../../../utils/renderByUVersion";
import { RecordPanelWithdraw as CRecordPanelWithdraw } from "./env/u1/RecordPanelWithdraw"
import { RecordPanelWithdraw as RioRecordPanelWithdraw } from './env/u2/RecordPanelWithdraw'


export const RecordPanelDeposit = () => {

  return renderByUVersion({
    "u2": <RioRecordPanelWithdraw />,
  }, <CRecordPanelWithdraw />);
}






