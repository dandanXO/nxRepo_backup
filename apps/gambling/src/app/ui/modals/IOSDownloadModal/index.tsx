import {renderByPlatform} from "../../utils/renderByPlatform";
import { CocoIOSDownloadModal } from "./env/coco"
import { RiojungleIOSDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}


export const IOSDownloadModal = () => {
  return renderByPlatform({
    "riojungle777bet": <RiojungleIOSDownloadModal />,
  }, <CocoIOSDownloadModal />);
}
