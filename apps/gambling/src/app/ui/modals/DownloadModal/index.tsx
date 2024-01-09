import {renderByUVersion} from "../../utils/renderByUVersion";
import { CocoDownloadModal } from "./env/coco"
import { RiojungleDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}

export const DownloadModal = (props: IInitialChargeModal) => {
  return renderByUVersion({
    "u2": <RiojungleDownloadModal {...props}/>,
  }, <CocoDownloadModal {...props}/>);
}
