import {renderByPlatform} from "../../../../utils/renderByPlatform";
import { RecordPanelWithdraw as CRecordPanelWithdraw } from "./env/coco/RecordPanelWithdraw"
import { RecordPanelWithdraw as RioRecordPanelWithdraw } from './env/riojungle/RecordPanelWithdraw'


export const RecordPanelDeposit = () => {

  return renderByPlatform({
    "u2": <RioRecordPanelWithdraw />,
  }, <CRecordPanelWithdraw />);
}






