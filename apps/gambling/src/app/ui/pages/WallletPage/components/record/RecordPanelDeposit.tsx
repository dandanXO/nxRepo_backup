
import {renderByPlatform} from "../../../../utils/renderByPlatform";
import { RecordPanelDeposit as CRecordPanelDeposit } from "./env/coco/RecordPanelDeposit"
import { RecordPanelDeposit as RioRecordPanelDeposit } from './env/riojungle/RecordPanelDeposit'


export const RecordPanelDeposit = () => {

  return renderByPlatform({
    "u2": <RioRecordPanelDeposit />,
  }, <CRecordPanelDeposit />);
}





