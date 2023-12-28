import {renderByPlatform} from "../../../../utils/renderByPlatform";
import { RecordPanelWithdraw as CRecordPanelWithdraw } from "./env/coco/RecordPanelWithdraw"
import { RecordPanelWithdraw as RioRecordPanelWithdraw } from './env/riojungle/RecordPanelWithdraw'


export const RecordPanelDeposit = () => {

  return renderByPlatform({
    "riojungle777bet": <RioRecordPanelWithdraw />,
  }, <CRecordPanelWithdraw />);
}






