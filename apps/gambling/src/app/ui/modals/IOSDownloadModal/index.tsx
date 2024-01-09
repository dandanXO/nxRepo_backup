import {renderByUVersion} from "../../utils/renderByUVersion";
import { CocoIOSDownloadModal } from "./env/coco"
import { RiojungleIOSDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}


export const IOSDownloadModal = () => {
  return renderByUVersion({
    "u2": <RiojungleIOSDownloadModal />,
  }, <CocoIOSDownloadModal />);
}
