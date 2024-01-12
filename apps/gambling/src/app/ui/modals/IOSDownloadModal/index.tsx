import {renderByUVersion} from "../../utils/renderByUVersion";
import { CocoIOSDownloadModal } from "./env/u1"
import { RiojungleIOSDownloadModal } from "./env/u2"

export type IInitialChargeModal = {
  close: () => void;
}


export const IOSDownloadModal = () => {
  return renderByUVersion({
    "u2": <RiojungleIOSDownloadModal />,
  }, <CocoIOSDownloadModal />);
}
