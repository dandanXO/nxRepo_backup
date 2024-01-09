import {renderByUVersion} from "../../utils/renderByUVersion";
import { DailySignInRecordPage as CDailySignInRecordPage } from "./env/coco/"
import { DailySignInRecordPage as RioDailySignInRecordPage } from "./env/riojungle"


export const DailySignInRecordPage = () => {

  return renderByUVersion({
    "u2": <RioDailySignInRecordPage />,
  }, <CDailySignInRecordPage />);
}



