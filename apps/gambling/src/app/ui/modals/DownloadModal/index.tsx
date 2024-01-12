import {renderByUVersion} from "../../utils/renderByUVersion";
import { CocoDownloadModal } from "./env/u1"
import { RiojungleDownloadModal } from "./env/u2"

export type IInitialChargeModal = {
  close: () => void;
}

export const DownloadModal = (props: IInitialChargeModal) => {
  return renderByUVersion({
    "u2": <RiojungleDownloadModal {...props}/>,
  }, <CocoDownloadModal {...props}/>);
}
