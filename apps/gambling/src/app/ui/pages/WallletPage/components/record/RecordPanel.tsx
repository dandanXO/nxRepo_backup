import {renderByPlatform} from "../../../../utils/renderByPlatform";
import { RecordPanel as CRecordPanel } from "./env/coco/RecordPanel"
import { RecordPanel as RioRecordPanel } from './env/riojungle/RecordPanel'

type IRecordPanel = {
  recordPanelMode: 'deposit' | 'withdraw';
}

export const RecordPanel = (props: IRecordPanel) => {

  return renderByPlatform({
    "u2": <RioRecordPanel {...props}/>,
  }, <CRecordPanel {...props}/>);
}




