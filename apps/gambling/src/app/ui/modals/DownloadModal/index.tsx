import {renderByPlatform} from "../../utils/renderByPlatform";
import { DDownloadModal } from "./default"
import { RiojungleDownloadModal } from "./env/riojungle"

export type IInitialChargeModal = {
  close: () => void;
}

export const DownloadModal = (props: IInitialChargeModal) => {
  return renderByPlatform({
    "riojungle777bet": <RiojungleDownloadModal {...props}/>,
  }, <DDownloadModal {...props}/>);
}
