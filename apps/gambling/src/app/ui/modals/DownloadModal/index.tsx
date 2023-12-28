import {renderByPlatform} from "../../utils/renderByPlatform";
import { CocoDownloadModal } from "./env/coco"
import { RiojungleDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}

export const DownloadModal = (props: IInitialChargeModal) => {
  return renderByPlatform({
    "riojungle777bet": <RiojungleDownloadModal {...props}/>,
  }, <CocoDownloadModal {...props}/>);
}
