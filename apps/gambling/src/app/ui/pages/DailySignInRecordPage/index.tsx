import {renderByUVersion} from "../../utils/renderByUVersion";
import { DailySignInRecordPage as CDailySignInRecordPage } from "./env/u1/"
import { DailySignInRecordPage as RioDailySignInRecordPage } from "./env/u2"


export const DailySignInRecordPage = () => {

  return renderByUVersion({
    "u2": <RioDailySignInRecordPage />,
  }, <CDailySignInRecordPage />);
}



