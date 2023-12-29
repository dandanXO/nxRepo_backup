import {renderByPlatform} from "../../utils/renderByPlatform";
import { DailySignInRecordPage as CDailySignInRecordPage } from "./env/coco/"
import { DailySignInRecordPage as RioDailySignInRecordPage } from "./env/riojungle"


export const DailySignInRecordPage = () => {

  return renderByPlatform({
    "riojungle777bet": <RioDailySignInRecordPage />,
  }, <CDailySignInRecordPage />);
}



