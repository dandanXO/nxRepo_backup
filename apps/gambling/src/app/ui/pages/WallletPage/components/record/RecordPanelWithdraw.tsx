import {renderByUVersion} from "../../../../utils/renderByUVersion";
import { RecordPanelWithdraw as CRecordPanelWithdraw } from "./env/coco/RecordPanelWithdraw"
import { RecordPanelWithdraw as RioRecordPanelWithdraw } from './env/riojungle/RecordPanelWithdraw'


export const RecordPanelDeposit = () => {

  return renderByUVersion({
    "u2": <RioRecordPanelWithdraw />,
  }, <CRecordPanelWithdraw />);
}






