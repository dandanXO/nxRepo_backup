import {renderByUVersion} from "../../../../utils/renderByUVersion";
import { RecordPanel as CRecordPanel } from "./env/coco/RecordPanel"
import { RecordPanel as RioRecordPanel } from './env/riojungle/RecordPanel'

type IRecordPanel = {
  recordPanelMode: 'deposit' | 'withdraw';
}

export const RecordPanel = (props: IRecordPanel) => {

  return renderByUVersion({
    "u2": <RioRecordPanel {...props}/>,
  }, <CRecordPanel {...props}/>);
}




