
import {renderByUVersion} from "../../../../utils/renderByUVersion";
import { RecordPanelDeposit as CRecordPanelDeposit } from "./env/u1/RecordPanelDeposit"
import { RecordPanelDeposit as RioRecordPanelDeposit } from './env/u2/RecordPanelDeposit'


export const RecordPanelDeposit = () => {

  return renderByUVersion({
    "u2": <RioRecordPanelDeposit />,
  }, <CRecordPanelDeposit />);
}





