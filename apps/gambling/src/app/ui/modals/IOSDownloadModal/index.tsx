import {renderByPlatform} from "../../utils/renderByPlatform";
import { DIOSDownloadModal } from "./default"
import { RiojungleIOSDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}


export const IOSDownloadModal = () => {
  return renderByPlatform({
    "riojungle777bet": <RiojungleIOSDownloadModal />,
  }, <DIOSDownloadModal />);
}
