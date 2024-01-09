import {renderByPlatform} from "../../utils/renderByPlatform";
import { CocoDownloadModal } from "./env/coco"
import { RiojungleDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}

export const DownloadModal = (props: IInitialChargeModal) => {
  return renderByPlatform({
    "u2": <RiojungleDownloadModal {...props}/>,
  }, <CocoDownloadModal {...props}/>);
}
