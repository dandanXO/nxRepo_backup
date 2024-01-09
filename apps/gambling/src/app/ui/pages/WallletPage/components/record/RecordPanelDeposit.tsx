
import {renderByUVersion} from "../../../../utils/renderByUVersion";
import { RecordPanelDeposit as CRecordPanelDeposit } from "./env/coco/RecordPanelDeposit"
import { RecordPanelDeposit as RioRecordPanelDeposit } from './env/riojungle/RecordPanelDeposit'


export const RecordPanelDeposit = () => {

  return renderByUVersion({
    "u2": <RioRecordPanelDeposit />,
  }, <CRecordPanelDeposit />);
}





